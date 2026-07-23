from dataclasses import dataclass, asdict

@dataclass
class AIAnalysis:
    category : str
    confidence : float
    summary : str
    urgency : str
    entities : dict[str,list[str]]
    reasoning : list[str] | None = None

    def to_dict(self) -> dict:
        return asdict(self)
    
    @classmethod
    def from_dict(cls, data: dict):
        return cls(**data)