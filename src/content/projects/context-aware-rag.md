---
title: "Context-Aware RAG Pipeline"
slug: "context-aware-rag"
year: 2024
tags: ["AI/ML", "RAG", "Full-stack"]
stack: ["Python", "LangChain", "OpenAI", "Pinecone", "Next.js"]
summary: "Designed a retrieval-augmented generation system that grounds LLM responses in structured enterprise knowledge, reducing hallucination rates significantly."
problem: "An enterprise knowledge management system returned generic LLM answers disconnected from internal documentation, eroding user trust and requiring constant fact-checking."
approach: "Built a hybrid retrieval pipeline combining BM25 sparse retrieval with dense vector search, added a re-ranking step using cross-encoder models, and implemented citation tracking so every LLM response links back to source documents."
outcome: "Hallucination rate dropped from 34% to under 4% on an internal benchmark. Users rated answer accuracy 4.6/5 vs 2.9/5 for the baseline system."
featured: true
github: "https://github.com/Nan0101"
metrics:
  - label: "Hallucination rate"
    value: "4%"
  - label: "User accuracy score"
    value: "4.6/5"
  - label: "Source coverage"
    value: "98%"
---

An exploration of grounded generation — building systems where every claim is traceable to a source document, not just plausible-sounding.
