import cv2
import mediapipe as mp
from deepface import DeepFace
import numpy as np

# Initialize Mediapipe
mp_face_detection = mp.solutions.face_detection
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

# Initialize Mediapipe models
face_detection = mp_face_detection.FaceDetection()
pose = mp_pose.Pose()

def analyze_facial_expression(frame):
    """Analyze the emotion of the detected face using DeepFace."""
    try:
        analysis = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        emotion = analysis[0]['dominant_emotion']
        return emotion
    except:
        return None

def calculate_pose_score(pose_landmarks):
    """Analyze posture to detect confidence based on pose landmarks."""
    if pose_landmarks:
        left_shoulder = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
        right_shoulder = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]
        left_hip = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
        right_hip = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]

        # Calculate vertical alignment of shoulders and hips
        shoulder_diff = abs(left_shoulder.y - right_shoulder.y)
        hip_diff = abs(left_hip.y - right_hip.y)

        # Score is inversely proportional to misalignment
        alignment_score = 1 - (shoulder_diff + hip_diff)
        return max(0, alignment_score)  # Ensure score is non-negative
    return 0.5  # Default score if no posture detected

# Start Webcam
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Convert to RGB for Mediapipe and DeepFace
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Face Detection
    face_results = face_detection.process(rgb_frame)
    emotion = None

    if face_results.detections:
        for detection in face_results.detections:
            bbox = detection.location_data.relative_bounding_box
            h, w, c = frame.shape
            x, y, box_width, box_height = int(bbox.xmin * w), int(bbox.ymin * h), int(bbox.width * w), int(bbox.height * h)
            cv2.rectangle(frame, (x, y), (x + box_width, y + box_height), (255, 0, 0), 2)

            # Crop face for emotion analysis
            face_crop = frame[y:y + box_height, x:x + box_width]
            if face_crop.size > 0:
                emotion = analyze_facial_expression(face_crop)

    # Pose Detection
    pose_results = pose.process(rgb_frame)
    pose_score = calculate_pose_score(pose_results.pose_landmarks)

    # Draw pose landmarks
    if pose_results.pose_landmarks:
        mp_drawing.draw_landmarks(frame, pose_results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

    # Confidence score estimation
    confidence_score = (pose_score + (1 if emotion == "happy" else 0.5)) / 2

    # Display results
    cv2.putText(frame, f"Confidence Score: {confidence_score:.2f}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    if emotion:
        cv2.putText(frame, f"Emotion: {emotion}", (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 0), 2)

    cv2.imshow('Confidence Analysis', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

