# KnouxCore: المركز الذكي للتحكم الفضائي - الإصدار البلاتيني

<div align="center">

![KnouxCore Logo](https://i.postimg.cc/T3k13rnP/d04f3a9b-36ac-4127-953b-691a8b413256.png)

**المركز الذكي للتحكم الفضائي مع تقنيات الذكاء الاصطناعي المتقدمة**

[![Version](https://img.shields.io/badge/version-2.0.0-brightgreen.svg)](https://github.com/knouxcore/knouxcore)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[العربية](#العربية) | [English](#english)

</div>

---

## العربية

### 🌟 نظرة عامة

KnouxCore هو مركز تحكم فضائي متقدم يجمع بين الذكاء الاصطناعي والتصميم المستقبلي لتوفير تجربة تحكم شاملة ومتطورة. يتميز التطبيق بواجهة مستخدم ثورية مع تأثيرات بصرية مذهلة وأداء عالي.

### ✨ الميزات الرئيسية

- 🚀 **واجهة مستقبلية**: تصميم فضائي مع تأثيرات النيون والزجاج المصقول
- 🧠 **ذكاء اصطناعي متقدم**: تحليل ذكي للبيانات والأنظمة
- 🌐 **متعدد اللغات**: دعم كامل للعربية والإنجليزية مع RTL
- 📱 **تصميم متجاوب**: يعمل بسلاسة على جميع الأجهزة
- ⚡ **أداء عالي**: محسن للسرعة مع تأثيرات بصرية متقدمة
- 🔒 **أمان متقدم**: مركز أمان شامل مع مراقبة مستمرة
- 📊 **تحليلات في الوقت الفعلي**: مراقبة شاملة لجميع الأنظمة
- 🎨 **ثيمات متعددة**: أربعة ثيمات مختلفة قابلة للتخصيص

### 🎨 الثيمات المتاحة

1. **Cosmic Dark** (افتراضي): ثيم فضائي داكن مع ألوان النيون
2. **Cosmic Light**: نسخة فاتحة من الثيم الفضائي
3. **Neon Classic**: ثيم نيون كلاسيكي بألوان زاهية
4. **Deep Space**: ثيم الفضاء العميق المتقدم

### 🛠️ التقنيات المستخدمة

- **Frontend Framework**: React 19.1.0 مع TypeScript
- **Styling**: Tailwind CSS مع أنماط مخصصة
- **Animations**: Framer Motion للحركات المتقدمة
- **Icons**: Lucide React للأيقونات الحديثة
- **Build Tool**: Vite للبناء السريع
- **State Management**: React Context API
- **Routing**: React Router DOM v7

### 📁 هيكل المشروع

```
src/
├── components/          # المكونات القابلة لإعادة الاستخدام
│   ├── effects/        # تأثيرات بصرية (جسيمات، انتقالات)
│   ├── layout/         # مكونات التخطيط (شريط جانبي، علوي)
│   ├── splash/         # شاشة التحميل
│   ├── notifications/  # نظام الإشعارات
│   └── ui/            # مكونات واجهة المستخدم الأساسية
├── contexts/           # سياقات React للحالة العامة
├── pages/             # صفحات التطبيق
├── hooks/             # خطافات React مخصصة
├── lib/               # مكتبات مساعدة
├── styles/            # أنماط CSS وثيمات
├── config/            # ملفات التكوين
├── constants/         # الثوابت والتعدادات
└── types/             # تعريفات TypeScript
```

### 🚀 التثبيت والتشغيل

1. **استنساخ المشروع**:

```bash
git clone https://github.com/knouxcore/knouxcore.git
cd knouxcore
```

2. **تثبيت التبعيات**:

```bash
npm install
```

3. **تشغيل التطبيق**:

```bash
npm run dev
```

4. **فتح المتصفح**:

```
http://localhost:5173
```

### 🎯 الاستخدام

#### البدء السريع

1. **شاشة التحميل**: ستظهر شاشة تحميل مذهلة عند بدء التطبيق
2. **لوحة التحكم**: الصفحة الرئيسية تعرض إحصائيات شاملة
3. **الشريط الجانبي**: للتنقل بين الأقسام المختلفة
4. **الإعدادات**: لتخصيص الثيم واللغة والتفضيلات

#### الأقسام الرئيسية

- **🏠 لوحة التحكم**: نظرة عامة على النظام
- **🧠 الخدمات الذكية**: خدمات الذكاء الاصطناعي
- **📥 إدارة التحميلات**: مدير التحميلات المتقدم
- **🌐 مراقبة الشبكة**: مراقبة الشبكة في الوقت الفعلي
- **🛡️ مركز الأمان**: أدوات الأمان والحماية
- **⚙️ الإعدادات**: تخصيص التطبيق

### 🎨 التخصيص

#### تغيير الثيم

```typescript
import { themes } from "@/styles/themes";
import { getThemeVariables } from "@/styles/themes";

// تطبيق ثيم جديد
const newTheme = themes.cosmicLight;
const variables = getThemeVariables(newTheme);
```

#### إضافة ألوان مخصصة

```css
:root {
  --custom-primary: #00ffd5;
  --custom-secondary: #7c3aed;
  --custom-accent: #ff1493;
}
```

### 🔧 التطوير

#### إضافة مكون جديد

```bash
# إنشاء مكون جديد
mkdir src/components/my-component
touch src/components/my-component/MyComponent.tsx
```

#### إضافة صفحة جديدة

```bash
# إنشاء صفحة جديدة
touch src/pages/MyNewPage.tsx
```

#### تشغيل البناء للإنتاج

```bash
npm run build
```

### 📱 الاستجابة والدعم

- **الشاشات الكبيرة**: 1920px وما فوق
- **أجهزة سطح المكتب**: 1024px - 1919px
- **الأجهزة اللوحية**: 768px - 1023px
- **الهواتف المحمولة**: 320px - 767px

### 🔒 الأمان

- تشفير البيانات الحساسة
- مصادقة متعددة المستويات
- مراقبة الأنشطة المشبوهة
- تحديثات أمان منتظمة

### 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT. راجع ملف [LICENSE](LICENSE) للمزيد من التفاصيل.

### 🤝 المساهمة

نرحب بالمساهمات! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) قبل البدء.

### 📞 الدعم والتواصل

- **الموقع الرسمي**: [knouxcore.com](https://knouxcore.com)
- **البريد الإلكتروني**: support@knouxcore.com
- **Discord**: [انضم لمجتمعنا](https://discord.gg/knouxcore)
- **Twitter**: [@KnouxCore](https://twitter.com/knouxcore)

---

## English

### 🌟 Overview

KnouxCore is an advanced space control center that combines artificial intelligence with futuristic design to provide a comprehensive and sophisticated control experience. The application features a revolutionary user interface with stunning visual effects and high performance.

### ✨ Key Features

- 🚀 **Futuristic Interface**: Space-themed design with neon effects and glassmorphism
- 🧠 **Advanced AI**: Intelligent data and system analysis
- 🌐 **Multi-language**: Full Arabic and English support with RTL
- 📱 **Responsive Design**: Works smoothly on all devices
- ⚡ **High Performance**: Optimized for speed with advanced visual effects
- 🔒 **Advanced Security**: Comprehensive security center with continuous monitoring
- 📊 **Real-time Analytics**: Comprehensive monitoring of all systems
- 🎨 **Multiple Themes**: Four different customizable themes

### 🛠️ Technologies Used

- **Frontend Framework**: React 19.1.0 with TypeScript
- **Styling**: Tailwind CSS with custom styles
- **Animations**: Framer Motion for advanced animations
- **Icons**: Lucide React for modern icons
- **Build Tool**: Vite for fast building
- **State Management**: React Context API
- **Routing**: React Router DOM v7

### 🚀 Installation and Setup

1. **Clone the project**:

```bash
git clone https://github.com/knouxcore/knouxcore.git
cd knouxcore
```

2. **Install dependencies**:

```bash
npm install
```

3. **Run the application**:

```bash
npm run dev
```

4. **Open browser**:

```
http://localhost:5173
```

### 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

### 🤝 Contributing

We welcome contributions! Please read the [Contributing Guide](CONTRIBUTING.md) before getting started.

### 📞 Support and Contact

- **Official Website**: [knouxcore.com](https://knouxcore.com)
- **Email**: support@knouxcore.com
- **Discord**: [Join our community](https://discord.gg/knouxcore)
- **Twitter**: [@KnouxCore](https://twitter.com/knouxcore)

---

<div align="center">

**صُنع بـ ❤️ من فريق KnouxCore**

**Made with ❤️ by the KnouxCore Team**

</div>
