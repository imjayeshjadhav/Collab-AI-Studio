import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {

  const { name, email, password } = await req.json();

  console.log("Received data:", { name, email, password });

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ error: "All fields required" }), {
      status: 400,
    });
  }

  const client = await clientPromise;
  const db = client.db();

  const existing = await db.collection("users").findOne({ email });
  if (existing) {
    return new Response(JSON.stringify({ error: "Email already exists" }), {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.collection("users").insertOne({
    name,
    email,
    password: hashedPassword,
  });

  return new Response(JSON.stringify({ message: "User created" }), {
    status: 201,
  });
}
