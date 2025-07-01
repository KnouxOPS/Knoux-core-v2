/**
 * KnouxCore Data Simulation Utilities
 * محاكيات البيانات المتقدمة للواجهة الهولوجرافية
 */

export interface DataStream {
  id: string;
  name: string;
  type: "sensor" | "ai_model" | "communication" | "navigation" | "system";
  value: number;
  unit: string;
  trend: "increasing" | "decreasing" | "stable" | "volatile";
  health: "optimal" | "warning" | "critical";
  lastUpdate: Date;
  history: number[];
}

export interface AIModelStatus {
  id: string;
  name: string;
  type: "nlp" | "computer_vision" | "predictive" | "optimization" | "quantum";
  status: "training" | "active" | "idle" | "error";
  accuracy: number;
  latency: number;
  throughput: number;
  resourceUsage: {
    cpu: number;
    memory: number;
    gpu: number;
    quantum_units: number;
  };
  lastPrediction?: {
    input: string;
    output: string;
    confidence: number;
    timestamp: Date;
  };
}

export interface RealTimeMetrics {
  systemLoad: number;
  networkLatency: number;
  dataProcessingRate: number;
  aiInferenceCount: number;
  anomaliesDetected: number;
  securityThreats: number;
  energyConsumption: number;
  quantumCoherence: number;
}

export class DataSimulationEngine {
  private dataStreams: Map<string, DataStream> = new Map();
  private aiModels: Map<string, AIModelStatus> = new Map();
  private metrics: RealTimeMetrics;
  private subscribers: Set<(data: any) => void> = new Set();
  private simulationInterval?: NodeJS.Timeout;

  constructor() {
    this.metrics = this.initializeMetrics();
    this.initializeDataStreams();
    this.initializeAIModels();
  }

  private initializeMetrics(): RealTimeMetrics {
    return {
      systemLoad: 65,
      networkLatency: 12,
      dataProcessingRate: 1250,
      aiInferenceCount: 847,
      anomaliesDetected: 3,
      securityThreats: 0,
      energyConsumption: 78,
      quantumCoherence: 94.7,
    };
  }

  private initializeDataStreams(): void {
    const streams: DataStream[] = [
      {
        id: "navigation_coords",
        name: "Navigation Coordinates",
        type: "navigation",
        value: 0,
        unit: "AU",
        trend: "stable",
        health: "optimal",
        lastUpdate: new Date(),
        history: [],
      },
      {
        id: "quantum_flux",
        name: "Quantum Flux Density",
        type: "sensor",
        value: 94.2,
        unit: "QF",
        trend: "volatile",
        health: "optimal",
        lastUpdate: new Date(),
        history: [],
      },
      {
        id: "ai_processing_power",
        name: "AI Processing Power",
        type: "ai_model",
        value: 78.5,
        unit: "TOPS",
        trend: "increasing",
        health: "optimal",
        lastUpdate: new Date(),
        history: [],
      },
      {
        id: "cosmic_radiation",
        name: "Cosmic Radiation Level",
        type: "sensor",
        value: 23.7,
        unit: "μSv/h",
        trend: "stable",
        health: "warning",
        lastUpdate: new Date(),
        history: [],
      },
      {
        id: "communication_strength",
        name: "Communication Signal",
        type: "communication",
        value: 87.3,
        unit: "dBm",
        trend: "stable",
        health: "optimal",
        lastUpdate: new Date(),
        history: [],
      },
      {
        id: "system_temperature",
        name: "Core Temperature",
        type: "system",
        value: 42.8,
        unit: "°C",
        trend: "increasing",
        health: "optimal",
        lastUpdate: new Date(),
        history: [],
      },
    ];

    streams.forEach((stream) => {
      // Initialize history with some data points
      stream.history = Array.from(
        { length: 20 },
        () => stream.value + (Math.random() - 0.5) * 20,
      );
      this.dataStreams.set(stream.id, stream);
    });
  }

  private initializeAIModels(): void {
    const models: AIModelStatus[] = [
      {
        id: "codex_prime",
        name: "Codex Prime - Code Enhancement AI",
        type: "nlp",
        status: "active",
        accuracy: 96.8,
        latency: 150,
        throughput: 2400,
        resourceUsage: {
          cpu: 45,
          memory: 67,
          gpu: 82,
          quantum_units: 0,
        },
        lastPrediction: {
          input: "function optimizeRoute()",
          output: "Quantum-enhanced pathfinding algorithm implemented",
          confidence: 94.2,
          timestamp: new Date(),
        },
      },
      {
        id: "starchaser",
        name: "StarChaser - Navigation AI",
        type: "predictive",
        status: "active",
        accuracy: 99.1,
        latency: 80,
        throughput: 1800,
        resourceUsage: {
          cpu: 38,
          memory: 52,
          gpu: 91,
          quantum_units: 15,
        },
        lastPrediction: {
          input: "Calculate optimal route to Kepler-442b",
          output: "Route calculated: 3.2 years via gravitational slingshot",
          confidence: 97.8,
          timestamp: new Date(),
        },
      },
      {
        id: "pattern_sentinel",
        name: "Pattern Sentinel - Anomaly Detection",
        type: "computer_vision",
        status: "training",
        accuracy: 94.3,
        latency: 95,
        throughput: 3200,
        resourceUsage: {
          cpu: 72,
          memory: 84,
          gpu: 95,
          quantum_units: 8,
        },
      },
      {
        id: "astrovoice",
        name: "AstroVoice AI - Natural Language Processing",
        type: "nlp",
        status: "active",
        accuracy: 98.4,
        latency: 120,
        throughput: 2800,
        resourceUsage: {
          cpu: 56,
          memory: 71,
          gpu: 78,
          quantum_units: 12,
        },
        lastPrediction: {
          input: "Emergency protocol activation required",
          output: "Emergency protocols Alpha-7 through Delta-3 are now active",
          confidence: 99.1,
          timestamp: new Date(),
        },
      },
      {
        id: "quantum_optimizer",
        name: "Quantum Optimization Engine",
        type: "quantum",
        status: "idle",
        accuracy: 91.7,
        latency: 45,
        throughput: 5600,
        resourceUsage: {
          cpu: 25,
          memory: 34,
          gpu: 15,
          quantum_units: 87,
        },
      },
    ];

    models.forEach((model) => {
      this.aiModels.set(model.id, model);
    });
  }

  startSimulation(): void {
    if (this.simulationInterval) return;

    this.simulationInterval = setInterval(() => {
      this.updateDataStreams();
      this.updateAIModels();
      this.updateMetrics();
      this.notifySubscribers();
    }, 2000); // Update every 2 seconds
  }

  stopSimulation(): void {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = undefined;
    }
  }

  private updateDataStreams(): void {
    this.dataStreams.forEach((stream, id) => {
      const variation = this.getVariationForTrend(stream.trend);
      let newValue = stream.value + variation;

      // Apply bounds based on stream type
      switch (stream.type) {
        case "sensor":
          newValue = Math.max(0, Math.min(100, newValue));
          break;
        case "navigation":
          newValue = Math.max(-1000, Math.min(1000, newValue));
          break;
        case "system":
          newValue = Math.max(0, Math.min(150, newValue));
          break;
        default:
          newValue = Math.max(0, Math.min(100, newValue));
      }

      stream.value = newValue;
      stream.lastUpdate = new Date();
      stream.history.push(newValue);

      // Keep only last 50 data points
      if (stream.history.length > 50) {
        stream.history.shift();
      }

      // Update health status based on value
      stream.health = this.calculateHealthStatus(stream);

      // Occasionally change trend
      if (Math.random() < 0.05) {
        const trends: DataStream["trend"][] = [
          "increasing",
          "decreasing",
          "stable",
          "volatile",
        ];
        stream.trend = trends[Math.floor(Math.random() * trends.length)];
      }

      this.dataStreams.set(id, stream);
    });
  }

  private updateAIModels(): void {
    this.aiModels.forEach((model, id) => {
      // Update resource usage
      model.resourceUsage.cpu += (Math.random() - 0.5) * 10;
      model.resourceUsage.memory += (Math.random() - 0.5) * 8;
      model.resourceUsage.gpu += (Math.random() - 0.5) * 12;
      model.resourceUsage.quantum_units += (Math.random() - 0.5) * 5;

      // Clamp values
      Object.keys(model.resourceUsage).forEach((key) => {
        const resourceKey = key as keyof typeof model.resourceUsage;
        model.resourceUsage[resourceKey] = Math.max(
          0,
          Math.min(100, model.resourceUsage[resourceKey]),
        );
      });

      // Update performance metrics
      model.accuracy += (Math.random() - 0.5) * 0.5;
      model.accuracy = Math.max(85, Math.min(99.9, model.accuracy));

      model.latency += (Math.random() - 0.5) * 20;
      model.latency = Math.max(10, Math.min(500, model.latency));

      model.throughput += (Math.random() - 0.5) * 200;
      model.throughput = Math.max(100, Math.min(10000, model.throughput));

      // Occasionally change status
      if (Math.random() < 0.03) {
        const statuses: AIModelStatus["status"][] = [
          "training",
          "active",
          "idle",
        ];
        const currentIndex = statuses.indexOf(model.status);
        const availableStatuses = statuses.filter(
          (_, index) => index !== currentIndex,
        );
        model.status =
          availableStatuses[
            Math.floor(Math.random() * availableStatuses.length)
          ];
      }

      // Generate new predictions for active models
      if (model.status === "active" && Math.random() < 0.1) {
        model.lastPrediction = this.generatePrediction(model.type);
      }

      this.aiModels.set(id, model);
    });
  }

  private updateMetrics(): void {
    this.metrics.systemLoad += (Math.random() - 0.5) * 10;
    this.metrics.networkLatency += (Math.random() - 0.5) * 5;
    this.metrics.dataProcessingRate += (Math.random() - 0.5) * 200;
    this.metrics.aiInferenceCount += Math.floor(Math.random() * 50);
    this.metrics.energyConsumption += (Math.random() - 0.5) * 5;
    this.metrics.quantumCoherence += (Math.random() - 0.5) * 2;

    // Clamp values
    this.metrics.systemLoad = Math.max(
      0,
      Math.min(100, this.metrics.systemLoad),
    );
    this.metrics.networkLatency = Math.max(
      1,
      Math.min(1000, this.metrics.networkLatency),
    );
    this.metrics.dataProcessingRate = Math.max(
      100,
      Math.min(10000, this.metrics.dataProcessingRate),
    );
    this.metrics.energyConsumption = Math.max(
      0,
      Math.min(100, this.metrics.energyConsumption),
    );
    this.metrics.quantumCoherence = Math.max(
      0,
      Math.min(100, this.metrics.quantumCoherence),
    );

    // Occasionally detect anomalies or threats
    if (Math.random() < 0.02) {
      this.metrics.anomaliesDetected += Math.floor(Math.random() * 3);
    }
    if (Math.random() < 0.005) {
      this.metrics.securityThreats += Math.floor(Math.random() * 2);
    }
  }

  private getVariationForTrend(trend: DataStream["trend"]): number {
    switch (trend) {
      case "increasing":
        return Math.random() * 2 + 0.5;
      case "decreasing":
        return -Math.random() * 2 - 0.5;
      case "volatile":
        return (Math.random() - 0.5) * 8;
      default:
        return (Math.random() - 0.5) * 1;
    }
  }

  private calculateHealthStatus(stream: DataStream): DataStream["health"] {
    const recentAverage =
      stream.history.slice(-5).reduce((a, b) => a + b, 0) / 5;

    if (stream.type === "system" && recentAverage > 80) return "critical";
    if (stream.type === "sensor" && (recentAverage < 20 || recentAverage > 90))
      return "warning";
    if (stream.type === "communication" && recentAverage < 50)
      return "critical";

    return "optimal";
  }

  private generatePrediction(
    modelType: AIModelStatus["type"],
  ): AIModelStatus["lastPrediction"] {
    const predictions = {
      nlp: [
        {
          input: "Analyze communication logs",
          output: "No threats detected in recent transmissions",
          confidence: 95.7,
        },
        {
          input: "Process user command",
          output: "Command interpreted: Navigation system adjustment",
          confidence: 97.2,
        },
        {
          input: "Translate alien signal",
          output: "Peaceful greeting detected from Proxima Centauri",
          confidence: 83.4,
        },
      ],
      computer_vision: [
        {
          input: "Scan asteroid field",
          output: "Clear navigation path identified, 847 objects tracked",
          confidence: 98.1,
        },
        {
          input: "Monitor system components",
          output: "All systems nominal, minor wear detected in module 7",
          confidence: 91.8,
        },
        {
          input: "Analyze starfield",
          output: "New celestial body discovered at coordinates 23.7, -45.2",
          confidence: 89.3,
        },
      ],
      predictive: [
        {
          input: "Calculate fuel consumption",
          output: "Estimated 72 hours of optimal fuel remaining",
          confidence: 96.5,
        },
        {
          input: "Predict system failures",
          output: "Cooling system may require maintenance in 340 hours",
          confidence: 87.9,
        },
        {
          input: "Forecast weather patterns",
          output: "Solar storm activity expected in 18 hours",
          confidence: 92.1,
        },
      ],
      optimization: [
        {
          input: "Optimize energy distribution",
          output: "Energy efficiency improved by 12.7%",
          confidence: 94.8,
        },
        {
          input: "Enhance processing speed",
          output: "Algorithm optimized, 23% performance increase",
          confidence: 96.3,
        },
        {
          input: "Minimize resource usage",
          output: "Resource allocation optimized, 15% reduction achieved",
          confidence: 93.7,
        },
      ],
      quantum: [
        {
          input: "Calculate quantum entanglement",
          output: "Quantum coherence stable at 94.7%",
          confidence: 99.2,
        },
        {
          input: "Optimize quantum gates",
          output: "Quantum processing efficiency increased by 8.4%",
          confidence: 97.6,
        },
        {
          input: "Predict quantum decoherence",
          output: "Coherence expected to maintain for 12.7 hours",
          confidence: 91.4,
        },
      ],
    };

    const modelPredictions = predictions[modelType] || predictions.nlp;
    const prediction =
      modelPredictions[Math.floor(Math.random() * modelPredictions.length)];

    return {
      ...prediction,
      timestamp: new Date(),
    };
  }

  subscribe(callback: (data: any) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notifySubscribers(): void {
    const data = {
      dataStreams: Array.from(this.dataStreams.values()),
      aiModels: Array.from(this.aiModels.values()),
      metrics: this.metrics,
      timestamp: new Date(),
    };

    this.subscribers.forEach((callback) => callback(data));
  }

  getDataStreams(): DataStream[] {
    return Array.from(this.dataStreams.values());
  }

  getAIModels(): AIModelStatus[] {
    return Array.from(this.aiModels.values());
  }

  getMetrics(): RealTimeMetrics {
    return { ...this.metrics };
  }

  getDataStreamById(id: string): DataStream | undefined {
    return this.dataStreams.get(id);
  }

  getAIModelById(id: string): AIModelStatus | undefined {
    return this.aiModels.get(id);
  }
}

// Singleton instance
export const dataSimulationEngine = new DataSimulationEngine();
