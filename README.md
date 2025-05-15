# Resume Parser

A simple full-stack resume parser application that extracts structured data from PDF resumes using Groq API and displays the parsed details in a user-friendly interface.

---

## Features

- Upload PDF resumes via a React frontend.
- Backend parses PDF text and sends it to Groq API (powered by Mixtral model) for structured data extraction.
- Extracted information includes:
  - Full Name
  - Email
  - Phone Number
  - Skills (array)
  - Education (degree, institution, year)
  - Work Experience (role, company, duration)
- Displays results in readable markdown format.
- Handles errors gracefully.

---

## Tech Stack

- **Frontend:** React, TypeScript, React Markdown
- **Backend:** Node.js, Express, Multer, pdf-parse, Groq API
- **Others:** Tailwind CSS (optional styling), dotenv for environment variables

---

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Groq API key ([Sign up here](https://console.groq.com))

---

## Setup

Note : Detailed instructions for setting up the frontend and backend are documented in the respective README files located within each folder.

--

## Demo Video


https://github.com/user-attachments/assets/ff49ae20-f53a-4e5d-9274-cdf336d7071e


### Screenshots

Landing page :

![image](https://github.com/user-attachments/assets/aa74a50e-3274-4ff3-8eec-5fa9c3982d6e)

Parse data: 

![image](https://github.com/user-attachments/assets/79fd766e-f11d-4025-b363-6f8a315d56bc)

![image](https://github.com/user-attachments/assets/aa1e649b-7a4d-49f2-8122-1f4fd5e40bc9)

---

### Edge Case Handling & Trade-offs

This project addresses various edge cases such as inconsistent resume formatting, missing fields, and ambiguous terms by leveraging a language model for flexible parsing. However, proficiency levels are not extracted, and date normalization is limited. The balance between AI adaptability and validation complexity was maintained to deliver an effective prototype within the time constraints.




