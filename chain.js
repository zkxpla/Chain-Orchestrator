// CryptaFlux Chain Orchestrator
// Multi-layer rule-driven execution simulation

// ---------------- DATA MODEL ----------------

class AssetUnit {
    constructor(id, value, type, key) {
        this.id = id;
        this.value = value;
        this.type = type; // coin or token
        this.key = key;
        this.stage = "initialized";
    }
}

// ---------------- KEY AUTHENTICATION LAYER ----------------

class KeyGate {
    constructor(secret) {
        this.secret = secret;
    }

    validate(inputKey) {
        // Simple deterministic validation rule
        return inputKey.split("").reverse().join("") === this.secret;
    }
}

// ---------------- TRANSFORMATION ENGINE ----------------

class TransformLayer {
    process(asset) {
        // Convert coin → token under rule-based transformation
        if (asset.type === "coin" && asset.value > 50) {
            return {
                ...asset,
                type: "token",
                value: asset.value * 1.1,
                stage: "transformed"
            };
        }

        return {
            ...asset,
            stage: "unchanged"
        };
    }
}

// ---------------- CHAIN PROCESSOR ----------------

class ChainNode {
    constructor(name) {
        this.name = name;
    }

    execute(asset) {
        // Each node applies a lightweight mutation
        return {
            ...asset,
            value: asset.value + this.name.length,
            stage: `processed_by_${this.name}`
        };
    }
}

// ---------------- ORCHESTRATION ENGINE ----------------

class ChainEngine {
    constructor(nodes, gate) {
        this.nodes = nodes;
        this.gate = gate;
        this.transform = new TransformLayer();
    }

    run(asset) {
        // Phase 1: Key validation
        if (!this.gate.validate(asset.key)) {
            return { asset, status: "REJECTED_INVALID_KEY" };
        }

        // Phase 2: Transformation logic
        let current = this.transform.process(asset);

        // Phase 3: Chain execution flow
        for (const node of this.nodes) {
            current = node.execute(current);
        }

        return {
            asset: current,
            status: "COMPLETED"
        };
    }
}

// ---------------- SYSTEM INITIALIZATION ----------------

// Chain nodes represent distributed processing units
const nodes = [
    new ChainNode("Alpha"),
    new ChainNode("Beta"),
    new ChainNode("Gamma")
];

// Secret key reversed form: "yek_nimda"
const gate = new KeyGate("admin_key");

// Engine instance
const engine = new ChainEngine(nodes, gate);

// Sample asset stream
const stream = [
