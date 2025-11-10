"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { validateEmail } from "@/components/utils/validateEmail";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

const HomeContact = () => {
  const t = useTranslations("contact");
  const locale = useLocale();
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t("errors.nameRequired");
    }
    if (!formData.email.trim()) {
      newErrors.email = t("errors.emailRequired");
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t("errors.emailInvalid");
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t("errors.phoneRequired");
    }
    if (!formData.message.trim()) {
      newErrors.message = t("errors.messageRequired");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
  };

  const switchTo = (next: "en" | "vi") => {
    try {
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`;
    } catch {}
    const cleanPath =
      pathname.startsWith("/en") || pathname.startsWith("/vi")
        ? pathname.replace(/^\/(en|vi)/, "") || "/"
        : pathname || "/";
    const target =
      next === "en" ? `/en${cleanPath === "/" ? "" : cleanPath}` : cleanPath;
    window.location.assign(target);
  };

  return (
    <div
      className="w-full min-h-screen py-24 relative"
      style={{
        backgroundImage: "url(/images/home/cover-footer.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-[#1a4d4d]/80"></div>
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className=" mx-auto">
          {/* Title */}
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-[28px] font-black leading-[50px] text-white text-center relative pb-4 after:content-[''] after:w-[100px] after:h-[2px] after:bg-white after:bottom-0 after:left-1/2 after:absolute after:-translate-x-1/2">
              {t("title")}
            </h1>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="mb-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("form.name")}
                  className="w-full bg-transparent border-0 border-b-2 border-white/50 text-white placeholder:text-white/70 focus:border-white focus:outline-none pb-2 transition-colors"
                />
                {errors.name && (
                  <p className="text-red-300 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("form.email")}
                  className="w-full bg-transparent border-0 border-b-2 border-white/50 text-white placeholder:text-white/70 focus:border-white focus:outline-none pb-2 transition-colors"
                />
                {errors.email && (
                  <p className="text-red-300 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("form.phone")}
                  className="w-full bg-transparent border-0 border-b-2 border-white/50 text-white placeholder:text-white/70 focus:border-white focus:outline-none pb-2 transition-colors"
                />
                {errors.phone && (
                  <p className="text-red-300 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("form.message")}
                  rows={4}
                  className="w-full bg-transparent border-0 border-b-2 border-white/50 text-white placeholder:text-white/70 focus:border-white focus:outline-none pb-2 resize-none transition-colors"
                />
                {errors.message && (
                  <p className="text-red-300 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="border-2 border-white text-white px-8 py-2 rounded-md hover:bg-white hover:text-[#1a4d4d] transition-colors duration-300 uppercase"
                >
                  {t("form.submit")}
                </button>
              </div>
            </div>
          </form>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between gap-8 max-w-7xl mx-auto">
            
            {/* === PHẦN ĐÃ SỬA === */}
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-white font-bold text-lg uppercase">
                {t("info.projectName")}
              </h2>
              {/* Hiển thị thông tin mới từ vi.json */}
              <div className="space-y-2 text-white">
                <p>
                  <span className="font-semibold">{t("info.hotline1_label")}:</span>{" "}
                  <a href="tel:0345747138" className="hover:underline">
                    {t("info.hotline1_value")}
                  </a>
                </p>
                <p>
                  <span className="font-semibold">{t("info.hotline2_label")}:</span>{" "}
                  <a href="tel:0826768386" className="hover:underline">
                    {t("info.hotline2_value")}
                  </a>
                </p>
                <p>
                  <span className="font-semibold">{t("info.email_label")}:</span>{" "}
                  <a href="mailto:Thesoleildanangofficial@gmail.com" className="hover:underline">
                    {t("info.email_value")}
                  </a>
                </p>
                <p>
                  <span className="font-semibold">{t("info.address_label")}:</span>{" "}
                  {t("info.address_value")}
                </p>
              </div>
              <Link
                href="/terms" // Bạn hãy đảm bảo trang /terms này tồn tại nhé
                className="text-white hover:underline block mt-4"
              >
                {t("info.termsOfUse")}
              </Link>
            </div>
            {/* === KẾT THÚC PHẦN SỬA === */}

            {/* Social Media & Brochure */}
            <div className="space-y-6">
              {/* Social Media Icons (Link FB đã được cập nhật tự động từ vi.json) */}
              <div className="flex gap-4">
                <a
                  href={t("social.facebook")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#1a4d4d] transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={t("social.instagram")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#1a4d4d] transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={t("social.youtube")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#1a4d4d] transition-colors"
                >
                  <Youtube size={20} />
                </a>
              </div>

              {/* Brochure Download */}
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4">
                  {t("brochure.title")}
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => switchTo("vi")}
                    className={`px-6 py-2 rounded-full border-2 border-white transition-colors ${
                      locale === "vi"
                        ? "bg-white text-[#1a4d4d]"
                        : "text-white hover:bg-white hover:text-[#1a4d4d]"
                    }`}
                  >
                    {t("brochure.vietnamese")}
                  </button>
                  <button
                    onClick={() => switchTo("en")}
                    className={`px-6 py-2 rounded-full border-2 border-white transition-colors ${
                      locale === "en"
                        ? "bg-white text-[#1a4d4d]"
                        : "text-white hover:bg-white hover:text-[#1a4d4d]"
                    }`}
                  >
                    {t("brochure.english")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContact;