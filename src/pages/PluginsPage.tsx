import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Puzzle, Download, Settings, Star, ExternalLink } from "lucide-react";

interface Plugin {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  version: string;
  author: string;
  rating: number;
  downloads: number;
  category: string;
  categoryAr: string;
  installed: boolean;
  enabled: boolean;
}

const PluginsPage: React.FC = () => {
  const [plugins] = React.useState<Plugin[]>([
    {
      id: "1",
      name: "Advanced Download Manager",
      nameAr: "مدير التحميل المتقدم",
      description: "Enhanced download management with advanced features",
      descriptionAr: "إدارة التحميل المحسنة مع ميزات متقدمة",
      version: "2.1.0",
      author: "KnouxCore Team",
      rating: 4.8,
      downloads: 15420,
      category: "Downloads",
      categoryAr: "التحميلات",
      installed: true,
      enabled: true,
    },
    {
      id: "2",
      name: "Security Scanner",
      nameAr: "ماسح الأمان",
      description: "Real-time security monitoring and threat detection",
      descriptionAr: "مراقبة الأمان في الوقت الفعلي وكشف التهديدات",
      version: "1.5.2",
      author: "SecureNet",
      rating: 4.6,
      downloads: 8934,
      category: "Security",
      categoryAr: "الأمان",
      installed: false,
      enabled: false,
    },
    {
      id: "3",
      name: "Network Optimizer",
      nameAr: "محسن الشبكة",
      description: "Optimize network performance and connection speed",
      descriptionAr: "تحسين أداء الشبكة وسرعة الاتصال",
      version: "3.0.1",
      author: "NetWorks Inc",
      rating: 4.5,
      downloads: 12678,
      category: "Network",
      categoryAr: "الشبكة",
      installed: true,
      enabled: false,
    },
  ]);

  const categories = ["All", "Downloads", "Security", "Network", "Utilities"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-foreground">
            الإضافات والمكونات
          </h1>
          <p className="text-muted-foreground mt-2">
            إدارة وتثبيت الإضافات لتوسيع وظائف النظام
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <Puzzle className="h-4 w-4 mr-2" />
          {plugins.length} إضافة متاحة
        </Badge>
      </div>

      {/* شريط الفئات */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 rounded-lg bg-background/60 border border-border text-sm font-medium hover:bg-accent/50 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* شبكة الإضافات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plugins.map((plugin) => (
          <Card
            key={plugin.id}
            className="p-6 glassmorphism bg-background/60 hover:bg-background/80 transition-colors"
          >
            <div className="space-y-4">
              {/* رأس الإضافة */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Puzzle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-foreground">
                      {plugin.nameAr}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {plugin.name}
                    </p>
                  </div>
                </div>
                {plugin.installed && (
                  <Badge
                    variant={plugin.enabled ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {plugin.enabled ? "مفعل" : "متوقف"}
                  </Badge>
                )}
              </div>

              {/* وصف الإضافة */}
              <p className="text-sm text-muted-foreground">
                {plugin.descriptionAr}
              </p>

              {/* معلومات الإضافة */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>الإصدار {plugin.version}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{plugin.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{plugin.author}</span>
                <div className="flex items-center space-x-1">
                  <Download className="h-3 w-3" />
                  <span>{plugin.downloads.toLocaleString()}</span>
                </div>
              </div>

              {/* أزرار الإجراءات */}
              <div className="flex space-x-2 pt-2">
                {plugin.installed ? (
                  <>
                    <button
                      className={`flex-1 px-3 py-2 text-xs rounded-md transition-colors ${
                        plugin.enabled
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      }`}
                    >
                      {plugin.enabled ? "تعطيل" : "تفعيل"}
                    </button>
                    <button className="px-3 py-2 text-xs bg-muted/50 text-muted-foreground rounded-md hover:bg-muted/70 transition-colors">
                      <Settings className="h-3 w-3" />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex-1 px-3 py-2 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                      تثبيت
                    </button>
                    <button className="px-3 py-2 text-xs bg-muted/50 text-muted-foreground rounded-md hover:bg-muted/70 transition-colors">
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 glassmorphism bg-background/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Download className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">الإضافات المثبتة</p>
              <p className="text-xl font-semibold text-primary-foreground">
                {plugins.filter((p) => p.installed).length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 glassmorphism bg-background/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Settings className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">الإضافات المفعلة</p>
              <p className="text-xl font-semibold text-primary-foreground">
                {plugins.filter((p) => p.enabled).length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 glassmorphism bg-background/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Puzzle className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">إجمالي المتاح</p>
              <p className="text-xl font-semibold text-primary-foreground">
                {plugins.length}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PluginsPage;
