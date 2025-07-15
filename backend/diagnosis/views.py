from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.files.storage import default_storage
from rest_framework import status
from django.contrib.auth import authenticate
from .models import Prediction
from .serializers import RegisterSerializer, LoginSerializer, PredictionSerializer
from ultralytics import YOLO
import os
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import permission_classes


#new content

from rest_framework.decorators import api_view, permission_classes
from .models import DiagnosisImage
from .serializers import DiagnosisImageSerializer

# Load YOLO model once
model_path = os.path.join('models', 'yolo.pt')
model = YOLO(model_path)


@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# delete Result History

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_prediction(request, pk):
    try:
        prediction = Prediction.objects.get(pk=pk, user=request.user)
        prediction.delete()
        return Response({'message': 'Deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Prediction.DoesNotExist:
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def login_user(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        user = authenticate(request, username=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'email': user.email,
                    'role': user.role,
                    'full_name': user.first_name,
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Fetch diagnosis history for the authenticated user

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def diagnosis_history(request):
    predictions = Prediction.objects.filter(user=request.user).order_by('-id')
    serializer = PredictionSerializer(predictions, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def predict(request):
    if 'image' not in request.FILES:
        return Response({'error': 'No image uploaded'}, status=400)
    image = request.FILES['image']
    filename = default_storage.save('uploads/' + image.name, image)
    image_path = os.path.join('media', filename)
    results = model(image_path)
    boxes = results[0].boxes
    names = model.names
    predictions = []
    for box in boxes:
        cls_id = int(box.cls.item())
        confidence = round(box.conf.item() * 100, 2)
        bbox = box.xyxy[0].tolist()
        predictions.append({
            "disease": names[cls_id],
            "confidence": confidence,
            "bbox": bbox
        })

    saved = Prediction.objects.create(
        user=request.user,  # Save the user who made the prediction
        image=filename, 
        result=predictions
        )

    return Response({
        "image_url": f"/media/{filename}",
        "results": predictions
    })
