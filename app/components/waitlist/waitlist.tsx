'use client';
import { useState, useRef } from "react";
import HeroCircles from "../landing_page/hero_circles";

export default function FetchitWaitlistPage() {
  const [role, setRole] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="w-full min-h-screen bg-white ">
      {/* HERO SECTION */}
      <section className="relative bg-linear-to-br from-black via-[#6639CA] to-black text-white md:h-[815px] ">
        <div className="max-w-screen-2xl mx-auto px-6 py-24 md:pt-[250px] grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h1 className="text-4xl md:text-[52px] font-medium leading-tight">
              Find trusted help.
              <br />
              Or earn by offering your skills.
            </h1>
            <p className="mt-6 text-gray-300 max-w-lg text-[22px]">
              Fetchit connects people to reliable handymen and trusted personal shoppers — with secure payments, transparency, and fast payouts.
            </p>

            <div className="mt-10">
              <p className="text-sm uppercase tracking-wide text-gray-400 mb-3">
                Join Fetchit as
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleRoleSelect("user")}
                  className="px-6 py-3 rounded-xl bg-white text-black font-normal text-[22px] hover:opacity-90"
                >
                  I need services
                </button>
                <button
                  onClick={() => handleRoleSelect("handyman")}
                  className="px-6 py-3 rounded-xl bg-[#FFD101] border-gray-700 hover:bg-[#FFD101]/20 text-black font-normal text-[22px]"
                >
                  I’m a Handyman
                </button>
                <button
                  onClick={() => handleRoleSelect("shopper")}
                  className="px-6 py-3 rounded-xl bg-[#FFD101] border border-gray-700 hover:bg-[#FFD101]/20 text-black font-normal text-[22px]"
                >
                  I’m a Personal Shopper
                </button>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 w-full lg:w-auto flex items-center justify-center">
                    <HeroCircles />
                  </div>
        </div>
      </section>

      {/* WHY JOIN SECTION */}
      <section className="bg-white py-30 px-6">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-22">
            Why join Fetchit?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 rounded-2xl border bg-[#6639CA]/65">
              <h3 className="font-bold lg:text-[30px] text-[25px] mb-3 text-white">For Users</h3>
              <p className="text-white lg:text-[20px] text-[19px] leading-8">
                Stop chasing unreliable contacts. Find verified handymen and personal shoppers, see clear pricing, and pay securely through the app.
              </p>
            </div>
            <div className="p-10 rounded-2xl border bg-[#6639CA]/65">
              <h3 className="font-bold lg:text-[30px] text-[25px] mb-3 text-white">For Handymen</h3>
              <p className="text-white lg:text-[20px] text-[19px] leading-8">
                Get visibility, steady jobs, and serious customers without stress. Pay only to be listed and keep 100% of what you earn.
              </p>
            </div>
            <div className="p-10 rounded-2xl border bg-[#6639CA]/65">
              <h3 className="font-bold lg:text-[30px] text-[25px] mb-3 text-white">For Personal Shoppers</h3>
              <p className="text-white lg:text-[20px] text-[19px] leading-8">
                Accept shopping requests confidently. Customer payments are secured upfront and released immediately after delivery confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUESTIONNAIRE SECTION */}
      <section ref={formRef} className="bg-gray-50 py-20 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
          {!role && (
            <p className="text-center text-gray-500">
              Select a role above to join the waitlist.
            </p>
          )}

          {role && (
            <form className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Join the Fetchit Waitlist
                </h2>
                <p className="text-gray-600 mt-2">
                  Help us tailor Fetchit for you.
                </p>
              </div>

              {/* Common fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <input className="border rounded-lg px-4 py-3" placeholder="Full name" />
                <input className="border rounded-lg px-4 py-3" placeholder="Email address" />
              </div>
              <input className="border rounded-lg px-4 py-3 w-full" placeholder="City / Location" />

              {/* USER */}
              {role === "user" && (
                <>
                  <select className="border rounded-lg px-4 py-3 w-full">
                    <option>How do you currently find help?</option>
                    <option>Friends / family</option>
                    <option>WhatsApp contacts</option>
                    <option>Social media vendors</option>
                    <option>I struggle to find anyone reliable</option>
                  </select>
                  <select className="border rounded-lg px-4 py-3 w-full">
                    <option>Which service would you use first?</option>
                    <option>Handyman</option>
                    <option>Personal shopper</option>
                    <option>Both</option>
                  </select>
                  <textarea className="border w-full rounded-lg px-4 py-3 h-28" placeholder="What frustrates you most with your current option?" />
                </>
              )}

              {/* HANDYMAN */}
              {role === "handyman" && (
                <>
                  <input className="border rounded-lg px-4 py-3 w-full" placeholder="Your main skill (e.g. Plumbing)" />
                  <select className="border rounded-lg px-4 py-3 w-full">
                    <option>Would you pay to be listed if jobs are consistent?</option>
                    <option>Yes</option>
                    <option>Maybe</option>
                    <option>No</option>
                  </select>
                  <select className="border rounded-lg px-4 py-3 w-full">
                    <option>How much would you pay monthly?</option>
                    <option>₦1,000 – ₦3,000</option>
                    <option>₦3,000 – ₦5,000</option>
                    <option>₦5,000+</option>
                  </select>
                </>
              )}

              {/* SHOPPER */}
              {role === "shopper" && (
                <>
                  <select className="border rounded-lg px-4 py-3 w-full">
                    <option>Have you used your own money to shop for others?</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                  <select className="border rounded-lg px-4 py-3 w-full">
                    <option>Max amount you’re comfortable spending upfront</option>
                    <option>Under ₦10,000</option>
                    <option>₦10,000 – ₦30,000</option>
                    <option>₦30,000+</option>
                  </select>
                  <select className="border rounded-lg px-4 py-3 w-full">
                    <option>How fast should payout be after delivery?</option>
                    <option>Immediately</option>
                    <option>Same day</option>
                    <option>Within 24 hours</option>
                  </select>
                </>
              )}

              <button className="w-full bg-[#FFD101] text-black py-4 rounded-xl font-semibold">
                Join Waitlist
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
