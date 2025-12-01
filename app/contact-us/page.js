"use client";
import React, { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import Chip_ins from "@/components/home/Chip_ins";

const ContactUs = () => {
  
  

  return (
    <>

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
       <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
              <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Email Us</h3>
                <p className="text-white/60 text-sm mt-1">papermind@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
              <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Call Us</h3>
                <p className="text-white/60 text-sm mt-1">+1 (555) 000-0000</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
              <div className="p-3 rounded-xl bg-pink-500/20 text-pink-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Visit Us</h3>
                <p className="text-white/60 text-sm mt-1">123 Innovation Dr, Tech City, TC 90210</p>
              </div>
            </div>
          </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
