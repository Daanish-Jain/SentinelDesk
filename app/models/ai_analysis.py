from dataclasses import dataclass

@dataclass
class AIAnalysis:
    category : str
    confidence : float
    summary : str
    urgency : str
    entities : dict[str,list[str]]
    reasoning : list[str] | None = None

    