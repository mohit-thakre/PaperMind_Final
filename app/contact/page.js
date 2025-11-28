"use client";
import Chip_ins from "@/components/home/Chip_ins";
import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-full pt-24">
      <Chip_ins defination="Contact Us" />
      <div className=" max-w-3xl mx-auto flex flex-col ">
        <h3 className=" text-2xl lg:text-5xl text-white text-center font-medium">
          Stay Connected With Us
        </h3>
        <p className="text-purple-100/70 mb-5 text-center text-sm md:text-base mt-4 max-w-md px-8 lg:px-2 mx-auto font-medium">
          Your feedback, ideas, and questions help us improve your PDF
          experience every day.
        </p>
        <div className="mx-auto">
          <form
            onSubmit={handleSubmit}
            className="shadow-input bg-transparent max-w-lg p-4 [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] row-span-1 flex flex-col md:mx-0  justify-between space-y-4 rounded-xl border border-neutral-200  transition duration-200 dark:border-white/[0.2] dark:bg-black dark:shadow-none"
          >
            <div className=" flex flex-col max-w-lg mx-auto">
              <div className=" flex justify-between gap-4">
                <div>
                  <label htmlFor="firstName" className=" font-medium ">
                    First name{" "}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="p-3 border-1 rounded-sm w-full my-1"
                  ></input>
                </div>

                <div>
                  <label htmlFor="lastName" className=" font-medium">
                    Last name{" "}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    required
                    onChange={handleChange}
                    className="p-3 border-1 rounded-sm w-full  my-1"
                  ></input>
                </div>
              </div>

              <div className="py-4">
                <label htmlFor="email" className=" font-medium">
                  Work Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-3 border-1 rounded-sm w-full my-1"
                ></input>
              </div>
              <div>
                <label htmlFor="message" className=" font-medium">
                  Message
                </label>
                <textarea
                  type="text"
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="p-3 border rounded-sm w-full my-1"
                ></textarea>
              </div>

              <button className="p-3 my-4 cursor-pointer rounded-xl w-full bg-violet-600 border-purple-400 border-2">
                Send Message
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-12 text-left space-y-2 text-white/80">
          <h4 className="text-xl font-semibold text-white mb-4">Contact Details</h4>
          <p><strong>Address:</strong> NA</p>
          <p><strong>Email:</strong> papermind@gmail.com</p>
          <p><strong>Phone:</strong> NA</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
