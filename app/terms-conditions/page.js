"use client";
import Chip_ins from "@/components/home/Chip_ins";
import React from "react";

const Page = () => {
  return (
    <div className="w-full pt-24 pb-12 px-4">
      <Chip_ins defination="Terms & Conditions" />
      <div className="max-w-4xl mx-auto mt-8 text-white/80 space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-8">
          Terms & Conditions
        </h1>
        
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">1. Agreement to Terms</h2>
          <p>
            These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&ldquo;you&rdquo;) and PaperMind (&quot;we,&quot; &quot;us&quot; or &quot;our&quot;), concerning your access to and use of the [papermind website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the &ldquo;Site&rdquo;).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the &ldquo;Content&rdquo;) and the trademarks, service marks, and logos contained therein (the &ldquo;Marks&rdquo;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">3. User Representations</h2>
          <p>
            By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms and Conditions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">4. Prohibited Activities</h2>
          <p>
            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">5. Limitation of Liability</h2>
          <p>
            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">6. Contact Us</h2>
          <p>
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
          </p>
          <div className="mt-2">
            <p><strong>Email:</strong> papermind@gmail.com</p>
            <p><strong>Phone:</strong> NA</p>
            <p><strong>Address:</strong> NA</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
