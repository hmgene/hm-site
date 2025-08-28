import os
from openai import OpenAI

client = OpenAI()  # Uses OPENAI_API_KEY from environment
response = client.chat.completions.create(
    model="gpt-4.1",
    messages=[{"role": "user", "content": "Hello, are you working?"}]
)
print(response.choices[0].message.content)
