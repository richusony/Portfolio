"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ChangeEvent, FormEvent, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import Loader from "react-js-loader";

type FormDataType = {
  senderName: string,
  senderEmail: string,
  message: string,
}

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    senderName: "",
    senderEmail: "",
    message: ""
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!formData.senderEmail) return toast("Sender Email is required!!", {
      theme: "dark",
      type: "error"
    })

    if (!formData.senderEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.senderEmail)) {
      return toast("Invalid email format!", { theme: "dark", type: "error" });
    }
    
    if (!formData.message.trim()) {
      return toast("Message cannot be empty!", { theme: "dark", type: "error" });
    }
    

    const stringifiedData = JSON.stringify(formData);
    try {
      setLoading(true);
      const resData = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/send-message`, {
        method: "POST",
        body: stringifiedData,
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!resData.ok) {
        setLoading(false);
        const res = await resData.json();
        return toast(res?.error, {
          theme: "dark",
          type: "error"
        });
      } else {
        setLoading(false);
        setFormData({senderName: "",  senderEmail: "", message: ""});
        return toast("Message sent successfully", {
          theme: "dark",
          type: "success"
        });
      }
    } catch (error) {
      setLoading(false);
      return toast("Something went wrong, please try later!!", {
        theme: "dark",
        type: "error"
      });
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
      <div className="max-w-md mx-auto">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input name="senderName" id="senderName" onChange={onInputChange} value={formData.senderName} placeholder="Your Name" />
          <Input name="senderEmail" id="senderEmail" onChange={onInputChange} value={formData.senderEmail} type="email" placeholder="Your Email" />
          <Textarea name="message" id="message" onChange={onInputChange} value={formData.message} placeholder="Your Message" rows={4} />
          <Button type="submit" className="w-full">
            {loading?<div className="w-full flex justify-center items-center">
              <Loader type="spinner-cub" bgColor={"white"} color={"white"} size={20} />
            </div>:"Send Message"}
          </Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}