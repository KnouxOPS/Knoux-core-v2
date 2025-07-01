"use client";

import React from "react";
import { Card } from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Service } from "../../types/service";
import ServicePreview from "../../components/services/ServicePreview";

// بيانات تجريبية للخدمات
const DEMO_SERVICES: Service[] = [
  // ... (نفس البيانات كما هي)
  // يمكنك إبقاء البيانات كما هي أو تخصيصها لاحقًا
  {
    id: "1",
    name: "نظام المراقبة المتقدم",
    description:
      "مراقبة شاملة للأنظمة والشبكات مع تحليلات ذكية في الوقت الفعلي. يوفر تنبيهات فورية وتقارير أداء متقدمة مع دعم للذكاء الاصطناعي في تحليل الأنماط",
    icon: "🔍",
    status: "active",
    previewUrl:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: [
      "مراقبة 24/7",
      "تحليلات متقدمة",
      "تنبيهات ذكية",
      "لوحة تحكم مركزية",
    ],
  },
  {
    id: "2",
    name: "منصة التحكم الموحدة",
    description:
      "منصة متكاملة للتحكم في جميع الأنظمة والأجهزة عن بُعد. تدعم الأتمتة الذكية وجدولة المهام مع واجهة مستخدم سهلة الاستخدام",
    icon: "🎮",
    status: "active",
    previewUrl:
      "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["تحكم مركزي", "أتمتة ذكية", "جدولة المهام", "إدارة الصلاحيات"],
  },
  {
    id: "3",
    name: "نظام التقارير الذكي",
    description:
      "نظام متطور لإنشاء وتحليل التقارير مع دعم للرسوم البيانية التفاعلية والتصدير بصيغ متعددة. يوفر رؤى تحليلية عميقة ومؤشرات أداء رئيسية",
    icon: "📊",
    status: "active",
    previewUrl:
      "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: [
      "تقارير تفاعلية",
      "تصدير متعدد الصيغ",
      "تحليلات متقدمة",
      "مؤشرات أداء",
    ],
  },
  {
    id: "4",
    name: "إدارة الأمن السيبراني",
    description:
      "حماية متكاملة للأنظمة والبيانات مع مراقبة مستمرة للتهديدات وتحليل المخاطر. يشمل أدوات متقدمة للكشف والاستجابة للحوادث الأمنية",
    icon: "🔒",
    status: "active",
    previewUrl:
      "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: [
      "حماية متقدمة",
      "تحليل التهديدات",
      "استجابة للحوادث",
      "تقييم المخاطر",
    ],
  },
  {
    id: "5",
    name: "إدارة النسخ الاحتياطي",
    description:
      "نظام متكامل لإدارة النسخ الاحتياطي والاسترجاع مع دعم للتخزين السحابي والمحلي. يوفر جدولة تلقائية وتشفير متقدم للبيانات",
    icon: "💾",
    status: "active",
    previewUrl:
      "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["نسخ تلقائي", "تخزين سحابي", "استرجاع سريع", "تشفير متقدم"],
  },
  {
    id: "6",
    name: "خدمة تحليل البيانات",
    description:
      "خدمة متقدمة لتحليل البيانات الكبيرة باستخدام تقنيات الذكاء الاصطناعي. توفر رؤى قيمة تساعد في اتخاذ القرارات الاستراتيجية",
    icon: "📈",
    status: "active",
    previewUrl:
      "https://images.pexels.com/photos/386197/pexels-photo-386197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: [
      "تحليلات متقدمة",
      "تكامل مع مصادر بيانات متعددة",
      "لوحة تحكم تفاعلية",
      "تقارير دورية",
    ],
  },
  {
    id: "7",
    name: "منصة التواصل الداخلي",
    description:
      "منصة تواصل داخلي مخصصة للشركات لتحسين التعاون وتبادل المعلومات بين الفرق. تتضمن أدوات للمراسلة الفورية، مشاركة الملفات، وإدارة المشاريع",
    icon: "💬",
    status: "active",
    previewUrl:
      "https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: [
      "مراسلة فورية",
      "مشاركة ملفات",
      "إدارة مشاريع",
      "تكامل مع أدوات خارجية",
    ],
  },
];

// الصفحة الرئيسية للخدمات
export default function ServicesPage() {
  const [selectedService, setSelectedService] = React.useState<Service | null>(
    null,
  );

  // دعم التنقل عبر لوحة المفاتيح
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    service: Service,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      setSelectedService(service);
    }
  };

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary-foreground">
        الخدمات المتاحة
      </h1>

      {/* شبكة البطاقات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEMO_SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={selectedService?.id === service.id}
            onClick={() => setSelectedService(service)}
            onKeyDown={(e) => handleKeyDown(e, service)}
          />
        ))}
      </div>

      {/* معاينة الخدمة المختارة */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary-foreground">
          معاينة مباشرة
        </h2>
        <ScrollArea className="h-[500px] w-full rounded-lg border p-4 glassmorphism bg-background/60">
          {selectedService ? (
            <ServicePreview service={selectedService} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                الرجاء اختيار خدمة للمعاينة
              </p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

// خصائص بطاقة الخدمة
interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

// بطاقة الخدمة الواحدة
const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isSelected,
  onClick,
  onKeyDown,
}) => {
  return (
    <Card
      className={`p-6 hover:shadow-2xl transition-all cursor-pointer border-2 ${
        isSelected
          ? "ring-2 ring-primary border-primary bg-primary/10"
          : "border-gray-200 dark:border-gray-700"
      } focus:outline-none focus:ring-2 focus:ring-primary`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-selected={isSelected}
      tabIndex={0}
      role="button"
      title={`عرض تفاصيل ${service.name}`}
      dir="rtl"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-2xl" aria-label="أيقونة الخدمة">
            {service.icon}
          </span>
          <h3 className="text-xl font-semibold text-primary-foreground">
            {service.name}
          </h3>
        </div>
        <div
          className={`w-3 h-3 rounded-full border ${
            service.status === "active"
              ? "bg-green-500 border-green-700"
              : service.status === "error"
                ? "bg-red-500 border-red-700"
                : "bg-yellow-500 border-yellow-700"
          }`}
          aria-label={
            service.status === "active"
              ? "نشطة"
              : service.status === "error"
                ? "يوجد مشكلة"
                : "غير نشطة"
          }
        ></div>
      </div>
      <p
        className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
        title={service.description}
      >
        {service.description}
      </p>
      <ul className="mb-4 list-disc list-inside text-sm text-gray-700 dark:text-gray-200">
        {service.features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
      <img
        src={service.previewUrl}
        alt={`معاينة ${service.name}`}
        className="w-full h-32 object-cover rounded mb-4 border"
        loading="lazy"
      />
      <button
        className={`w-full bg-primary text-white dark:bg-white dark:text-primary py-2 rounded-md hover:opacity-90 transition-opacity font-bold ${
          isSelected ? "opacity-80" : ""
        }`}
        aria-pressed={isSelected}
        tabIndex={-1}
        type="button"
      >
        {isSelected ? "يتم العرض الآن" : "عرض التفاصيل"}
      </button>
    </Card>
  );
};
