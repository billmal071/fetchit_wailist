'use client';

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import HeroCircles from "../landing_page/hero_circles";
import {
  waitlistSchema,
  userSchema,
  handymanSchema,
  shopperSchema,
  type WaitlistFormData,
} from "@/lib/validations/waitlist";
import { submitWaitlist } from "@/lib/api/waitlist";

type Role = "user" | "handyman" | "shopper";

const getSchemaForRole = (role: Role) => {
  switch (role) {
    case "user":
      return userSchema;
    case "handyman":
      return handymanSchema;
    case "shopper":
      return shopperSchema;
  }
};

export default function FetchitWaitlistPage() {
  const [role, setRole] = useState<Role | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: role ? zodResolver(getSchemaForRole(role)) : undefined,
  });

  // Set the role in the form when it changes
  useEffect(() => {
    if (role) {
      setValue("role", role);
    }
  }, [role, setValue]);

  const mutation = useMutation({
    mutationFn: submitWaitlist,
    onSuccess: () => {
      setIsSuccess(true);
      reset();
    },
  });

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setIsSuccess(false);
    reset();
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const onSubmit = (data: WaitlistFormData) => {
    mutation.mutate(data);
  };

  const inputClasses = "border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#6639CA] focus:border-transparent transition-all";
  const selectClasses = "border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#6639CA] focus:border-transparent transition-all bg-white";
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <div className="w-full min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-linear-to-br from-black via-[#6639CA] to-black text-white md:h-[815px]">
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
                  className={`px-6 py-3 rounded-xl font-normal text-[22px] transition-all ${
                    role === "user"
                      ? "bg-white text-black ring-2 ring-[#FFD101]"
                      : "bg-white text-black hover:opacity-90"
                  }`}
                >
                  I need services
                </button>
                <button
                  onClick={() => handleRoleSelect("handyman")}
                  className={`px-6 py-3 rounded-xl font-normal text-[22px] transition-all ${
                    role === "handyman"
                      ? "bg-[#FFD101] text-black ring-2 ring-white"
                      : "bg-[#FFD101] border-gray-700 hover:bg-[#FFD101]/80 text-black"
                  }`}
                >
                  I&apos;m a Handyman
                </button>
                <button
                  onClick={() => handleRoleSelect("shopper")}
                  className={`px-6 py-3 rounded-xl font-normal text-[22px] transition-all ${
                    role === "shopper"
                      ? "bg-[#FFD101] text-black ring-2 ring-white"
                      : "bg-[#FFD101] border border-gray-700 hover:bg-[#FFD101]/80 text-black"
                  }`}
                >
                  I&apos;m a Personal Shopper
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
      <section id="waitlist-form" ref={formRef} className="bg-gray-50 py-20 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
          {!role && (
            <p className="text-center text-gray-500">
              Select a role above to join the waitlist.
            </p>
          )}

          {role && isSuccess && (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re on the list!</h2>
              <p className="text-gray-600">
                Thank you for joining the Fetchit waitlist. We&apos;ll notify you when we launch.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setRole(null);
                }}
                className="mt-6 text-[#6639CA] hover:underline"
              >
                Submit another response
              </button>
            </div>
          )}

          {role && !isSuccess && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Join the Fetchit Waitlist
                </h2>
                <p className="text-gray-600 mt-2">
                  Help us tailor Fetchit for you.
                </p>
              </div>

              {/* Hidden role field */}
              <input type="hidden" {...register("role")} value={role} />

              {/* Common fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("fullName")}
                    className={inputClasses}
                    placeholder="Full name"
                  />
                  {errors.fullName && (
                    <p className={errorClasses}>{errors.fullName.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    className={inputClasses}
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className={errorClasses}>{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div>
                <input
                  {...register("city")}
                  className={inputClasses}
                  placeholder="City / Location"
                />
                {errors.city && (
                  <p className={errorClasses}>{errors.city.message}</p>
                )}
              </div>

              {/* USER */}
              {role === "user" && (
                <>
                  <div>
                    <select {...register("howFindHelp")} className={selectClasses}>
                      <option value="">How do you currently find help?</option>
                      <option value="friends_family">Friends / family</option>
                      <option value="whatsapp">WhatsApp contacts</option>
                      <option value="social_media">Social media vendors</option>
                      <option value="struggle">I struggle to find anyone reliable</option>
                    </select>
                    {"howFindHelp" in errors && errors.howFindHelp && (
                      <p className={errorClasses}>{errors.howFindHelp.message}</p>
                    )}
                  </div>
                  <div>
                    <select {...register("firstService")} className={selectClasses}>
                      <option value="">Which service would you use first?</option>
                      <option value="handyman">Handyman</option>
                      <option value="personal_shopper">Personal shopper</option>
                      <option value="both">Both</option>
                    </select>
                    {"firstService" in errors && errors.firstService && (
                      <p className={errorClasses}>{errors.firstService.message}</p>
                    )}
                  </div>
                  <div>
                    <textarea
                      {...register("frustration")}
                      className={`${inputClasses} h-28 resize-none`}
                      placeholder="What frustrates you most with your current option?"
                    />
                  </div>
                </>
              )}

              {/* HANDYMAN */}
              {role === "handyman" && (
                <>
                  <div>
                    <input
                      {...register("mainSkill")}
                      className={inputClasses}
                      placeholder="Your main skill (e.g. Plumbing)"
                    />
                    {"mainSkill" in errors && errors.mainSkill && (
                      <p className={errorClasses}>{errors.mainSkill.message}</p>
                    )}
                  </div>
                  <div>
                    <select {...register("willingToPay")} className={selectClasses}>
                      <option value="">Would you pay to be listed if jobs are consistent?</option>
                      <option value="yes">Yes</option>
                      <option value="maybe">Maybe</option>
                      <option value="no">No</option>
                    </select>
                    {"willingToPay" in errors && errors.willingToPay && (
                      <p className={errorClasses}>{errors.willingToPay.message}</p>
                    )}
                  </div>
                  <div>
                    <select {...register("monthlyBudget")} className={selectClasses}>
                      <option value="">How much would you pay monthly?</option>
                      <option value="1000-3000">₦1,000 – ₦3,000</option>
                      <option value="3000-5000">₦3,000 – ₦5,000</option>
                      <option value="5000+">₦5,000+</option>
                    </select>
                    {"monthlyBudget" in errors && errors.monthlyBudget && (
                      <p className={errorClasses}>{errors.monthlyBudget.message}</p>
                    )}
                  </div>
                </>
              )}

              {/* SHOPPER */}
              {role === "shopper" && (
                <>
                  <div>
                    <select {...register("usedOwnMoney")} className={selectClasses}>
                      <option value="">Have you used your own money to shop for others?</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    {"usedOwnMoney" in errors && errors.usedOwnMoney && (
                      <p className={errorClasses}>{errors.usedOwnMoney.message}</p>
                    )}
                  </div>
                  <div>
                    <select {...register("maxSpendingAmount")} className={selectClasses}>
                      <option value="">Max amount you&apos;re comfortable spending upfront</option>
                      <option value="under-10000">Under ₦10,000</option>
                      <option value="10000-30000">₦10,000 – ₦30,000</option>
                      <option value="30000+">₦30,000+</option>
                    </select>
                    {"maxSpendingAmount" in errors && errors.maxSpendingAmount && (
                      <p className={errorClasses}>{errors.maxSpendingAmount.message}</p>
                    )}
                  </div>
                  <div>
                    <select {...register("payoutSpeed")} className={selectClasses}>
                      <option value="">How fast should payout be after delivery?</option>
                      <option value="immediately">Immediately</option>
                      <option value="same_day">Same day</option>
                      <option value="within_24_hours">Within 24 hours</option>
                    </select>
                    {"payoutSpeed" in errors && errors.payoutSpeed && (
                      <p className={errorClasses}>{errors.payoutSpeed.message}</p>
                    )}
                  </div>
                </>
              )}

              {/* Error message */}
              {mutation.isError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-[#FFD101] text-black py-4 rounded-xl font-semibold hover:bg-[#FFD101]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {mutation.isPending ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Joining...
                  </>
                ) : (
                  "Join Waitlist"
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
