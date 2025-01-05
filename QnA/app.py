import streamlit as st
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
# Function to configure GenAI
# def configure_genai():
#     api_key = os.getenv("GOOGLE_API_KEY")
#     if not api_key:
#         st.error(
#             "GOOGLE_API_KEY environment variable is not set. "
#             "Please set it to use the GenAI model or pass it directly in the code."
#         )
#         return False
#     genai.configure(api_key=api_key)
#     return True

# # Configure GenAI and stop execution if the API key is missing
# if not configure_genai():
#     st.stop()

# Function to generate Pandas questions and answers using GenAI
def generate_pandas_question_from_model(difficulty, num_questions):
    prompt = (
        f"Generate {num_questions} programming questions and answers related to Pandas "
        f"in Python at a {difficulty} difficulty level. Each question should be accompanied "
        f"by a detailed answer."
    )
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content([prompt])
        return response.text
    except Exception as e:
        raise RuntimeError(f"Error generating questions: {str(e)}")

# Streamlit App
st.set_page_config(page_title="Pandas Question Generator")
st.header("Pandas Question and Answer Generator")

# Difficulty Level
st.sidebar.subheader("Settings")
difficulty = st.sidebar.selectbox("Select Difficulty Level:", ["Easy", "Medium", "Hard"])

# Number of Questions
num_questions = st.sidebar.slider("Number of Questions:", 1, 10, 1)

# Generate Questions Button
if st.button("Generate Questions"):
    st.subheader("Generated Questions and Answers")
    try:
        qa_content = generate_pandas_question_from_model(difficulty, num_questions)
        st.markdown(qa_content)
    except RuntimeError as e:
        st.error(e)
    except Exception as e:
        st.error(f"An unexpected error occurred: {e}")
