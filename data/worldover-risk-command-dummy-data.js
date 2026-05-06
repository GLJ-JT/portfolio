window.WORLDOVER_RISK_COMMAND_DATA = {
  "meta": {
    "schemaVersion": "0.1.0",
    "generatedFor": "worldover-risk-command-wireframe.html",
    "purpose": "Dummy backend payload covering all display states and conditional UI branches in the Worldover Risk Command Centre prototype.",
    "lastUpdated": "2026-05-06"
  },
  "displayRules": {
    "severityToBadgeClass": {
      "critical": "badge critical",
      "warning": "badge warning",
      "monitor": "badge safe",
      "safe": "badge safe",
      "neutral": "badge"
    },
    "statusToBadgeClass": {
      "active": "badge warning",
      "attached": "badge safe",
      "blocked": "badge critical",
      "complete": "badge safe",
      "draft": "badge",
      "incomplete": "badge warning",
      "missing": "badge warning",
      "queued": "badge",
      "waiting": "badge"
    },
    "barClassRules": [
      {
        "condition": "record.severity === 'critical' && point.isFinalForecast",
        "className": "bar risk"
      },
      {
        "condition": "point.percentOfThreshold >= 75",
        "className": "bar warn"
      },
      {
        "condition": "default",
        "className": "bar"
      }
    ],
    "readinessRule": {
      "source": "activeCase.readiness.percent",
      "cssVariable": "--p",
      "display": "data-value"
    },
    "tabVisibility": {
      "activeTabField": "ui.activeTab",
      "tabs": [
        "risk-command",
        "production",
        "alerts",
        "reporting",
        "evidence"
      ]
    },
    "riskCommandStageVisibility": {
      "activeStageField": "ui.activeStage",
      "stages": [
        "detect",
        "decide",
        "assign"
      ]
    }
  },
  "ui": {
    "activeTab": "risk-command",
    "activeStage": "detect",
    "selectedEntityId": "entity-group-symrise",
    "selectedChemicalId": "chemical-limonene",
    "toast": {
      "visible": false,
      "message": "Ready",
      "durationMs": 1800
    },
    "tabs": [
      {
        "id": "risk-command",
        "step": 1,
        "label": "Risk Command",
        "description": "Triage and decide"
      },
      {
        "id": "production",
        "step": 2,
        "label": "Production",
        "description": "Factory output"
      },
      {
        "id": "alerts",
        "step": 3,
        "label": "Alerts",
        "description": "Rules and escalation"
      },
      {
        "id": "reporting",
        "step": 4,
        "label": "Reporting",
        "description": "Draft readiness"
      },
      {
        "id": "evidence",
        "step": 5,
        "label": "Evidence",
        "description": "Audit proof"
      }
    ],
    "riskCommandStages": [
      {
        "id": "detect",
        "step": 1,
        "label": "Detect",
        "description": "Validate the signal and stale data source."
      },
      {
        "id": "decide",
        "step": 2,
        "label": "Decide",
        "description": "Select the compliant operating move."
      },
      {
        "id": "assign",
        "step": 3,
        "label": "Assign",
        "description": "Set owners, due dates, and plant approval."
      }
    ]
  },
  "entities": [
    {
      "id": "entity-group-symrise",
      "selectLabel": "Symrise AG - Group View",
      "displayName": "Symrise AG",
      "scopeLabel": "Group compliance view",
      "scopeType": "group"
    },
    {
      "id": "entity-de-symrise",
      "selectLabel": "Symrise Germany GmbH",
      "displayName": "Symrise Germany GmbH",
      "scopeLabel": "Legal entity view",
      "scopeType": "entity"
    },
    {
      "id": "entity-fr-symrise",
      "selectLabel": "Symrise France SAS",
      "displayName": "Symrise France SAS",
      "scopeLabel": "Legal entity view",
      "scopeType": "entity"
    },
    {
      "id": "entity-uk-symrise",
      "selectLabel": "Symrise UK Ltd",
      "displayName": "Symrise UK Ltd",
      "scopeLabel": "Legal entity view",
      "scopeType": "entity"
    }
  ],
  "entityViews": {
    "entity-group-symrise": {
      "case": {
        "titleSuffix": "group threshold forecast",
        "summary": "Group view combines all legal entities. Factory B remains the main driver, and the annual forecast crosses the 1000t threshold unless November output changes.",
        "severity": "critical",
        "producedMultiplier": 1,
        "forecastMultiplier": 1,
        "readinessPercent": 64,
        "breachLabel": "Nov 2026"
      }
    },
    "entity-de-symrise": {
      "case": {
        "titleSuffix": "German entity breach",
        "summary": "Germany owns the active breach. Factory B contributes most of the legal entity output and the November plan is still above the registered threshold path.",
        "severity": "critical",
        "producedMultiplier": 0.71,
        "forecastMultiplier": 0.82,
        "readinessPercent": 58,
        "breachLabel": "Nov 2026",
        "riskCommand": {
          "detect": {
            "badge": {
              "label": "Plant sync issue",
              "status": "blocked"
            },
            "facts": [
              {
                "label": "Risk driver",
                "value": "Factory B legal entity plan, 584.90t year to date"
              },
              {
                "label": "Data quality",
                "value": "Germany sync refreshed after 72h stale window"
              },
              {
                "label": "Recommended move",
                "value": "Approve revised German November output before reporting"
              }
            ]
          },
          "decide": {
            "badge": {
              "label": "Plant decision",
              "status": "incomplete"
            },
            "selectedMitigationId": "mitigation-reduce-factory-b",
            "mitigationOptions": [
              {
                "id": "mitigation-reduce-factory-b",
                "label": "Reduce Factory B November output",
                "description": "Keeps the German entity below its registered annual threshold.",
                "impactLabel": "-96t"
              },
              {
                "id": "mitigation-transfer-entity",
                "label": "Move planned batch to France",
                "description": "Requires inter-entity evidence and recipient capacity check.",
                "impactLabel": "-62t"
              },
              {
                "id": "mitigation-threshold-upgrade",
                "label": "Escalate threshold upgrade",
                "description": "Useful for next year, but does not clear this report.",
                "impactLabel": "+14d"
              }
            ]
          },
          "assign": {
            "badge": {
              "label": "2 blockers",
              "status": "blocked"
            },
            "tasks": [
              {
                "title": "Upload German revised plan",
                "description": "Factory B needs the signed November schedule in evidence.",
                "ownerLabel": "Jonas, today"
              },
              {
                "title": "Confirm legal entity allocation",
                "description": "Compliance validates whether shifted output remains reportable.",
                "ownerLabel": "Maria, tomorrow"
              }
            ]
          }
        }
      },
      "production": {
        "summaryBadge": {
          "label": "Germany carries 71%",
          "status": "warning"
        },
        "chartMultiplier": 0.82,
        "factoryFacts": [
          {
            "label": "Factory A",
            "displayValue": "82.40t, 14%"
          },
          {
            "label": "Factory B",
            "displayValue": "584.90t, 71%"
          },
          {
            "label": "Factory C",
            "displayValue": "60.10t, 15%"
          }
        ]
      },
      "alerts": {
        "rules": [
          {
            "name": "German entity threshold",
            "trigger": "Forecast above 95%",
            "recipientsLabel": "Germany Compliance, Factory B",
            "escalation": "12h unresolved",
            "status": "active"
          },
          {
            "name": "Factory B stale sync",
            "trigger": "Production import older than 24h",
            "recipientsLabel": "Plant Manager",
            "escalation": "4h unresolved",
            "status": "blocked"
          }
        ]
      },
      "reporting": {
        "sections": [
          {
            "name": "German legal entity totals",
            "status": "blocked",
            "blockingIssue": "Factory B revised plan missing",
            "action": {
              "type": "tab-jump",
              "targetTab": "production",
              "label": "Open production"
            }
          },
          {
            "name": "Mitigation rationale",
            "status": "incomplete",
            "blockingIssue": "Decision note not signed",
            "action": {
              "type": "tab-jump",
              "targetTab": "risk-command",
              "label": "Open case"
            }
          }
        ]
      },
      "evidence": {
        "requiredEvidence": [
          {
            "title": "Factory B German export",
            "subtitle": "Imported today, 09:14",
            "status": "attached"
          },
          {
            "title": "German revised November plan",
            "subtitle": "Waiting for plant approval",
            "status": "missing"
          }
        ],
        "auditTrail": [
          {
            "timeLabel": "Today 09:14",
            "event": "Germany forecast refreshed",
            "actorLabel": "System",
            "evidenceLabel": "Entity forecast"
          },
          {
            "timeLabel": "Yesterday 16:30",
            "event": "Factory B escalation sent",
            "actorLabel": "System",
            "evidenceLabel": "Alert record"
          }
        ]
      },
      "drawer": {
        "resolutionPlan": {
          "selectedOwnerId": "person-jonas",
          "ownerOptions": [
            {
              "personId": "person-jonas",
              "label": "Jonas - Factory B Plant Manager"
            },
            {
              "personId": "person-maria",
              "label": "Maria - Compliance Officer"
            }
          ],
          "dueDate": "2026-05-07",
          "decisionNote": "Germany must upload the revised Factory B plan and confirm annual forecast before reporting unlocks."
        },
        "closeChecks": [
          {
            "label": "Factory B export attached",
            "checked": true,
            "readinessContribution": 16
          },
          {
            "label": "German revised plan approved",
            "checked": false,
            "readinessContribution": 18
          },
          {
            "label": "Entity forecast below threshold",
            "checked": false,
            "readinessContribution": 18
          }
        ]
      }
    },
    "entity-fr-symrise": {
      "case": {
        "titleSuffix": "France capacity watch",
        "summary": "France is below threshold and can absorb some transfer volume, but the report needs capacity evidence before the mitigation can be used.",
        "severity": "warning",
        "producedMultiplier": 0.19,
        "forecastMultiplier": 0.34,
        "readinessPercent": 72,
        "breachLabel": "Capacity watch"
      },
      "production": {
        "summaryBadge": {
          "label": "France has 128t headroom",
          "status": "neutral"
        },
        "chartMultiplier": 0.52,
        "factoryFacts": [
          {
            "label": "France Plant 1",
            "displayValue": "116.30t, 64%"
          },
          {
            "label": "France Plant 2",
            "displayValue": "65.10t, 36%"
          }
        ]
      },
      "alerts": {
        "rules": [
          {
            "name": "France capacity guardrail",
            "trigger": "Transfer plan above 80% capacity",
            "recipientsLabel": "France Operations",
            "escalation": "24h unresolved",
            "status": "active"
          }
        ]
      },
      "reporting": {
        "sections": [
          {
            "name": "France receiving capacity",
            "status": "incomplete",
            "blockingIssue": "Capacity evidence missing",
            "action": {
              "type": "tab-jump",
              "targetTab": "evidence",
              "label": "Open evidence"
            }
          },
          {
            "name": "Transfer note",
            "status": "waiting",
            "blockingIssue": "Depends on Germany decision",
            "action": {
              "type": "tab-jump",
              "targetTab": "risk-command",
              "label": "Open case"
            }
          }
        ]
      },
      "evidence": {
        "requiredEvidence": [
          {
            "title": "France capacity confirmation",
            "subtitle": "Plant controller review pending",
            "status": "missing"
          },
          {
            "title": "Receiving entity registration",
            "subtitle": "Attached from entity profile",
            "status": "attached"
          }
        ],
        "auditTrail": [
          {
            "timeLabel": "Today 10:02",
            "event": "France capacity check requested",
            "actorLabel": "Maria",
            "evidenceLabel": "Task record"
          }
        ]
      },
      "drawer": {
        "resolutionPlan": {
          "selectedOwnerId": "person-maria",
          "ownerOptions": [
            {
              "personId": "person-maria",
              "label": "Maria - Compliance Officer"
            },
            {
              "personId": "person-joe",
              "label": "Joe - Reporting Lead"
            }
          ],
          "dueDate": "2026-05-08",
          "decisionNote": "France can receive volume only after capacity evidence is attached and Germany confirms transfer volume."
        },
        "closeChecks": [
          {
            "label": "Capacity confirmation attached",
            "checked": false,
            "readinessContribution": 20
          },
          {
            "label": "Receiving registration confirmed",
            "checked": true,
            "readinessContribution": 16
          }
        ]
      }
    },
    "entity-uk-symrise": {
      "case": {
        "titleSuffix": "UK monitor state",
        "summary": "UK has no active breach. The current work is confirmation: keep the audit record complete and prevent report closure from waiting on UK evidence.",
        "severity": "monitor",
        "producedMultiplier": 0.1,
        "forecastMultiplier": 0.16,
        "readinessPercent": 88,
        "breachLabel": "No breach"
      },
      "production": {
        "summaryBadge": {
          "label": "UK below threshold",
          "status": "complete"
        },
        "chartMultiplier": 0.28,
        "factoryFacts": [
          {
            "label": "UK Site",
            "displayValue": "74.20t, 100%"
          }
        ]
      },
      "alerts": {
        "rules": [
          {
            "name": "UK evidence reminder",
            "trigger": "Missing monthly confirmation",
            "recipientsLabel": "UK Compliance",
            "escalation": "48h unresolved",
            "status": "waiting"
          }
        ]
      },
      "reporting": {
        "sections": [
          {
            "name": "UK monthly confirmation",
            "status": "complete",
            "blockingIssue": "None",
            "action": {
              "type": "view",
              "label": "Review"
            }
          },
          {
            "name": "UK report appendix",
            "status": "waiting",
            "blockingIssue": "Queued after group sign-off",
            "action": {
              "type": "view",
              "label": "View"
            }
          }
        ]
      },
      "evidence": {
        "requiredEvidence": [
          {
            "title": "UK monthly confirmation",
            "subtitle": "Attached yesterday",
            "status": "attached"
          },
          {
            "title": "UK report appendix",
            "subtitle": "Queued for final draft",
            "status": "queued"
          }
        ],
        "auditTrail": [
          {
            "timeLabel": "Yesterday 12:20",
            "event": "UK confirmation attached",
            "actorLabel": "Joe",
            "evidenceLabel": "Confirmation PDF"
          }
        ]
      },
      "drawer": {
        "resolutionPlan": {
          "selectedOwnerId": "person-joe",
          "ownerOptions": [
            {
              "personId": "person-joe",
              "label": "Joe - Reporting Lead"
            },
            {
              "personId": "person-maria",
              "label": "Maria - Compliance Officer"
            }
          ],
          "dueDate": "2026-05-10",
          "decisionNote": "UK is monitor-only. Keep appendix queued and confirm no report blocker remains."
        },
        "closeChecks": [
          {
            "label": "Monthly confirmation attached",
            "checked": true,
            "readinessContribution": 18
          },
          {
            "label": "Appendix queued",
            "checked": true,
            "readinessContribution": 18
          }
        ]
      }
    }
  },
  "people": [
    {
      "id": "person-maria",
      "name": "Maria",
      "role": "Compliance Officer"
    },
    {
      "id": "person-jonas",
      "name": "Jonas",
      "role": "Factory B Plant Manager"
    },
    {
      "id": "person-joe",
      "name": "Joe",
      "role": "Reporting Lead"
    },
    {
      "id": "person-system",
      "name": "System",
      "role": "Automation"
    }
  ],
  "chemicals": [
    {
      "id": "chemical-limonene",
      "selectLabel": "Limonene",
      "unit": "t",
      "case": {
        "id": "case-limonene-2026",
        "severity": "critical",
        "title": "Limonene threshold breach forecast",
        "summary": "Factory B is driving 71% of current output. If November production continues as planned, the annual REACH threshold crosses 1000t before year end.",
        "metrics": {
          "produced": 820.1,
          "threshold": 1000,
          "forecast": 1080,
          "breachLabel": "Nov 2026"
        },
        "readiness": {
          "percent": 64,
          "label": "64%",
          "components": {
            "decisionSaved": false,
            "ownerAssigned": true,
            "evidenceComplete": false,
            "reportReady": false
          }
        },
        "riskCommand": {
          "detect": {
            "badge": {
              "label": "Needs action",
              "status": "blocked"
            },
            "facts": [
              {
                "label": "Risk driver",
                "value": "Factory B output plan, 584.90t year to date"
              },
              {
                "label": "Data quality",
                "value": "Factory B sync refreshed after 72h stale window"
              },
              {
                "label": "Recommended move",
                "value": "Reduce November Limonene output before report generation"
              }
            ]
          },
          "decide": {
            "badge": {
              "label": "Decision needed",
              "status": "incomplete"
            },
            "selectedMitigationId": "mitigation-reduce-factory-b",
            "mitigationOptions": [
              {
                "id": "mitigation-reduce-factory-b",
                "label": "Reduce Factory B November output",
                "description": "Keeps forecast below registered threshold.",
                "impactLabel": "-118t",
                "effect": {
                  "forecastDelta": -118,
                  "expectedForecast": 962,
                  "expectedStatus": "safe"
                }
              },
              {
                "id": "mitigation-transfer-entity",
                "label": "Transfer output to another registered entity",
                "description": "Requires legal entity confirmation and new evidence.",
                "impactLabel": "-84t",
                "effect": {
                  "forecastDelta": -84,
                  "expectedForecast": 996,
                  "expectedStatus": "warning"
                }
              },
              {
                "id": "mitigation-threshold-upgrade",
                "label": "Start threshold upgrade workflow",
                "description": "Does not resolve the immediate reporting blocker.",
                "impactLabel": "+14d",
                "effect": {
                  "forecastDelta": 0,
                  "expectedForecast": 1080,
                  "expectedStatus": "blocked",
                  "delayDays": 14
                }
              }
            ]
          },
          "assign": {
            "badge": {
              "label": "3 tasks",
              "status": "neutral"
            },
            "tasks": [
              {
                "id": "task-revised-plan",
                "title": "Confirm revised November plan",
                "description": "Plant team must upload the reduced production schedule.",
                "ownerId": "person-jonas",
                "ownerLabel": "Jonas, today",
                "dueDate": "2026-05-06",
                "status": "active"
              },
              {
                "id": "task-recalculate-forecast",
                "title": "Recalculate annual forecast",
                "description": "Compliance validates whether the breach date clears.",
                "ownerId": "person-maria",
                "ownerLabel": "Maria, 3 May",
                "dueDate": "2026-05-03",
                "status": "waiting"
              },
              {
                "id": "task-report-note",
                "title": "Prepare report note",
                "description": "Reporting lead adds the mitigation rationale to the draft.",
                "ownerId": "person-joe",
                "ownerLabel": "Joe, 4 May",
                "dueDate": "2026-05-04",
                "status": "waiting"
              }
            ]
          }
        }
      },
      "production": {
        "summaryBadge": {
          "label": "Factory B drives 71%",
          "status": "warning"
        },
        "thresholdLabel": "1000t",
        "chart": [
          {
            "period": "Jul",
            "value": 220,
            "percentOfThreshold": 22,
            "isActual": true,
            "isFinalForecast": false
          },
          {
            "period": "Aug",
            "value": 360,
            "percentOfThreshold": 36,
            "isActual": true,
            "isFinalForecast": false
          },
          {
            "period": "Sep",
            "value": 510,
            "percentOfThreshold": 51,
            "isActual": true,
            "isFinalForecast": false
          },
          {
            "period": "Oct",
            "value": 670,
            "percentOfThreshold": 67,
            "isActual": true,
            "isFinalForecast": false
          },
          {
            "period": "Now",
            "value": 820.1,
            "percentOfThreshold": 82,
            "isActual": true,
            "isFinalForecast": false
          },
          {
            "period": "Dec",
            "value": 1080,
            "percentOfThreshold": 100,
            "isActual": false,
            "isFinalForecast": true
          }
        ],
        "factoryFacts": [
          {
            "factoryId": "factory-a",
            "label": "Factory A",
            "produced": 141.12,
            "sharePercent": 17,
            "syncStatus": "good",
            "displayValue": "141.12t, 17%"
          },
          {
            "factoryId": "factory-b",
            "label": "Factory B",
            "produced": 584.9,
            "sharePercent": 71,
            "syncStatus": "stale-refreshed",
            "displayValue": "584.90t, 71%"
          },
          {
            "factoryId": "factory-c",
            "label": "Factory C",
            "produced": 94.08,
            "sharePercent": 12,
            "syncStatus": "good",
            "displayValue": "94.08t, 12%"
          }
        ]
      }
    },
    {
      "id": "chemical-hedione",
      "selectLabel": "Hedione",
      "unit": "t",
      "case": {
        "id": "case-hedione-2026",
        "severity": "warning",
        "title": "Hedione approaching weekly limit",
        "summary": "Output is inside the annual threshold, but the current plan leaves little margin for late Q4 production changes.",
        "metrics": {
          "produced": 891.2,
          "threshold": 1000,
          "forecast": 970,
          "breachLabel": "No breach"
        },
        "readiness": {
          "percent": 76,
          "label": "76%",
          "components": {
            "decisionSaved": true,
            "ownerAssigned": true,
            "evidenceComplete": false,
            "reportReady": false
          }
        }
      },
      "production": {
        "summaryBadge": {
          "label": "Factory B drives 44%",
          "status": "neutral"
        },
        "thresholdLabel": "1000t",
        "chart": [
          {
            "period": "Jul",
            "percentOfThreshold": 20,
            "isFinalForecast": false
          },
          {
            "period": "Aug",
            "percentOfThreshold": 28,
            "isFinalForecast": false
          },
          {
            "period": "Sep",
            "percentOfThreshold": 37,
            "isFinalForecast": false
          },
          {
            "period": "Oct",
            "percentOfThreshold": 49,
            "isFinalForecast": false
          },
          {
            "period": "Now",
            "percentOfThreshold": 66,
            "isFinalForecast": false
          },
          {
            "period": "Dec",
            "percentOfThreshold": 97,
            "isFinalForecast": true
          }
        ],
        "factoryFacts": [
          {
            "label": "Factory A",
            "displayValue": "210.40t, 24%"
          },
          {
            "label": "Factory B",
            "displayValue": "390.60t, 44%"
          },
          {
            "label": "Factory C",
            "displayValue": "290.20t, 32%"
          }
        ]
      }
    },
    {
      "id": "chemical-iso-e-super",
      "selectLabel": "Iso E Super",
      "unit": "t",
      "case": {
        "id": "case-iso-e-super-2026",
        "severity": "monitor",
        "title": "Iso E Super confirmation needed",
        "summary": "The chemical remains below threshold, but one entity confirmation is missing before the report can close.",
        "metrics": {
          "produced": 74.3,
          "threshold": 100,
          "forecast": 92,
          "breachLabel": "Watch"
        },
        "readiness": {
          "percent": 82,
          "label": "82%",
          "components": {
            "decisionSaved": true,
            "ownerAssigned": true,
            "evidenceComplete": true,
            "reportReady": false
          }
        }
      },
      "production": {
        "summaryBadge": {
          "label": "Factory A drives 55%",
          "status": "neutral"
        },
        "thresholdLabel": "100t",
        "chart": [
          {
            "period": "Jul",
            "percentOfThreshold": 8,
            "isFinalForecast": false
          },
          {
            "period": "Aug",
            "percentOfThreshold": 15,
            "isFinalForecast": false
          },
          {
            "period": "Sep",
            "percentOfThreshold": 31,
            "isFinalForecast": false
          },
          {
            "period": "Oct",
            "percentOfThreshold": 49,
            "isFinalForecast": false
          },
          {
            "period": "Now",
            "percentOfThreshold": 74,
            "isFinalForecast": false
          },
          {
            "period": "Dec",
            "percentOfThreshold": 92,
            "isFinalForecast": true
          }
        ],
        "factoryFacts": [
          {
            "label": "Factory A",
            "displayValue": "41.10t, 55%"
          },
          {
            "label": "Factory B",
            "displayValue": "0t, 0%"
          },
          {
            "label": "Factory C",
            "displayValue": "33.20t, 45%"
          }
        ]
      }
    }
  ],
  "alerts": {
    "canCreateRule": true,
    "rules": [
      {
        "id": "alert-limonene-critical",
        "name": "Limonene critical risk",
        "trigger": "Forecast above 95%",
        "recipients": [
          "Compliance",
          "Plant Manager"
        ],
        "recipientsLabel": "Compliance, Plant Manager",
        "escalation": "24h unresolved",
        "status": "active"
      },
      {
        "id": "alert-stale-production",
        "name": "Stale production data",
        "trigger": "No sync for 72h",
        "recipients": [
          "Data owner"
        ],
        "recipientsLabel": "Data owner",
        "escalation": "48h unresolved",
        "status": "active"
      },
      {
        "id": "alert-report-gap",
        "name": "Report gap",
        "trigger": "Missing field before deadline",
        "recipients": [
          "Compliance lead"
        ],
        "recipientsLabel": "Compliance lead",
        "escalation": "7 days before due",
        "status": "draft"
      }
    ]
  },
  "reporting": {
    "canGenerateDraft": false,
    "generateDisabledReason": "Draft is gated until evidence is complete",
    "sections": [
      {
        "id": "report-chemical-registry",
        "name": "Chemical registry",
        "status": "complete",
        "blockingIssue": "None",
        "action": {
          "label": "Review",
          "type": "local"
        }
      },
      {
        "id": "report-production-totals",
        "name": "Production totals",
        "status": "blocked",
        "blockingIssue": "Revised Factory B plan missing",
        "action": {
          "label": "Open production",
          "type": "tab-jump",
          "targetTab": "production"
        }
      },
      {
        "id": "report-threshold-confirmation",
        "name": "Threshold confirmation",
        "status": "incomplete",
        "blockingIssue": "Forecast recalculation pending",
        "action": {
          "label": "Open case",
          "type": "tab-jump",
          "targetTab": "risk-command"
        }
      },
      {
        "id": "report-final-signoff",
        "name": "Final sign-off",
        "status": "waiting",
        "blockingIssue": "Awaiting previous sections",
        "action": {
          "label": "View",
          "type": "local"
        }
      }
    ]
  },
  "evidence": {
    "canAttachFile": true,
    "requiredEvidence": [
      {
        "id": "evidence-factory-b-export",
        "title": "Factory B production export",
        "subtitle": "Imported today, 09:14",
        "status": "attached",
        "requiredForClose": true
      },
      {
        "id": "evidence-revised-plan",
        "title": "Revised November plan",
        "subtitle": "Waiting for plant approval",
        "status": "missing",
        "requiredForClose": true
      },
      {
        "id": "evidence-forecast-recalc",
        "title": "Forecast recalculation",
        "subtitle": "Generated after mitigation is saved",
        "status": "queued",
        "requiredForClose": true
      }
    ],
    "auditTrail": [
      {
        "id": "audit-forecast-recalc",
        "timeLabel": "Today 09:14",
        "timestamp": "2026-05-06T09:14:00+01:00",
        "event": "Forecast recalculated at 1080t",
        "actorId": "person-system",
        "actorLabel": "System",
        "evidenceLabel": "Forecast record",
        "evidenceId": "evidence-forecast-recalc"
      },
      {
        "id": "audit-critical-alert",
        "timeLabel": "Yesterday 16:30",
        "timestamp": "2026-05-05T16:30:00+01:00",
        "event": "Critical threshold alert sent",
        "actorId": "person-system",
        "actorLabel": "System",
        "evidenceLabel": "Alert record",
        "evidenceId": "alert-limonene-critical"
      },
      {
        "id": "audit-report-draft",
        "timeLabel": "30 Apr 11:05",
        "timestamp": "2026-04-30T11:05:00+01:00",
        "event": "Draft annual report generated",
        "actorId": "person-joe",
        "actorLabel": "Joe",
        "evidenceLabel": "Report draft",
        "evidenceId": "report-draft-2026"
      }
    ]
  },
  "drawer": {
    "readiness": {
      "title": "Case readiness",
      "description": "Progress is based on decision, owners, evidence, and report readiness.",
      "saveButtonLabel": "Save resolution plan"
    },
    "resolutionPlan": {
      "ownerOptions": [
        {
          "personId": "person-maria",
          "label": "Maria - Compliance Officer"
        },
        {
          "personId": "person-jonas",
          "label": "Jonas - Factory B Plant Manager"
        },
        {
          "personId": "person-joe",
          "label": "Joe - Reporting Lead"
        }
      ],
      "selectedOwnerId": "person-maria",
      "dueDate": "2026-05-03",
      "decisionNote": "Reduce Factory B Limonene output for November and recalculate annual forecast before report generation."
    },
    "closeChecks": [
      {
        "id": "check-factory-export",
        "label": "Factory B export attached",
        "checked": true,
        "readinessContribution": 11
      },
      {
        "id": "check-revised-plan",
        "label": "Revised production plan approved",
        "checked": false,
        "readinessContribution": 11
      },
      {
        "id": "check-forecast-below-threshold",
        "label": "Forecast below 1000t after mitigation",
        "checked": false,
        "readinessContribution": 11
      },
      {
        "id": "check-report-note",
        "label": "Report note generated",
        "checked": false,
        "readinessContribution": 11
      }
    ]
  },
  "emptyStates": {
    "alerts": {
      "showWhen": "alerts.rules.length === 0",
      "title": "No alert rules yet",
      "body": "Create a threshold or stale-data rule to start monitoring this scope.",
      "ctaLabel": "New rule"
    },
    "evidence": {
      "showWhen": "evidence.requiredEvidence.length === 0",
      "title": "No evidence attached",
      "body": "Attach the first source record or generate evidence from a saved mitigation.",
      "ctaLabel": "Attach file"
    },
    "reporting": {
      "showWhen": "reporting.sections.every(section => section.status === 'complete')",
      "title": "Report ready",
      "body": "All required sections are complete and the draft can be generated.",
      "ctaLabel": "Generate draft"
    }
  },
  "actions": {
    "refreshData": {
      "toast": "Risk data refreshed",
      "mutates": [
        "chemicals[].case",
        "chemicals[].production"
      ]
    },
    "saveResolutionPlan": {
      "toast": "Resolution plan saved",
      "mutates": [
        "chemicals[].case.readiness",
        "drawer.resolutionPlan"
      ]
    },
    "attachEvidence": {
      "toast": "Evidence attachment queued",
      "mutates": [
        "evidence.requiredEvidence"
      ]
    },
    "generateDraft": {
      "toast": "Draft is gated until evidence is complete",
      "requires": [
        "reporting.canGenerateDraft === true"
      ]
    },
    "newAlertRule": {
      "toast": "Alert rule draft opened",
      "mutates": [
        "alerts.rules"
      ]
    }
  }
};
