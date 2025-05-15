export async function parseResume(file: File): Promise<any> {
  const form = new FormData();
  form.append('resume', file);

  const res = await fetch('http://localhost:5000/parse', {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to parse resume');
  }

  return res.json();
}