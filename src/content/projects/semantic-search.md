---
title: "Semantic Search at Scale"
slug: "semantic-search"
year: 2024
tags: ["AI/ML", "RAG"]
stack: ["Python", "FAISS", "FastAPI", "React", "sentence-transformers"]
summary: "Built a semantic search engine over 10M+ documents using dense vector embeddings and approximate nearest neighbor lookup."
problem: "Traditional keyword search failed to surface contextually relevant documents across a large internal knowledge base, leading to poor discoverability and wasted researcher time."
approach: "Fine-tuned a sentence-transformers model on domain-specific query-document pairs, indexed embeddings with FAISS, and wrapped the retrieval pipeline in a FastAPI service with streaming responses and a React search UI."
outcome: "Reduced average query latency from 800ms to 120ms, increased user-rated result quality by 40%, and cut search-related support tickets by 60%."
featured: true
github: "https://github.com/Nan0101"
metrics:
  - label: "Latency reduction"
    value: "85%"
  - label: "Result quality"
    value: "+40%"
  - label: "Documents indexed"
    value: "10M+"
---

A deep dive into building production-grade semantic search with dense retrieval, covering embedding model selection, index tuning, and serving infrastructure.
