/* Basic Electronics (EC101)
   Generated from the checked project PDF files. */
registerSubject({
  "name": "Basic Electronics",
  "code": "EC101",
  "description": "Diodes, transistors, FETs, transducers, and electronic applications.",
  "icon": "??",
  "colorTheme": {
    "primary": "#3b82f6",
    "secondary": "#1d4ed8",
    "accent": "#60a5fa"
  },
  "aiContext": "Basic Electronics course covering p-n junctions, Zener diodes, rectifiers, LEDs, BJT transistors, transistor configurations, FETs, sensors, LVDT, LDR, Hall effect, and transducers.",
  "glossary": [
    {
      "term": "Diode",
      "def": "A p-n junction device that conducts mainly in one direction."
    },
    {
      "term": "Zener Diode",
      "def": "A diode designed to operate safely in reverse breakdown as a voltage regulator."
    },
    {
      "term": "BJT",
      "def": "Bipolar Junction Transistor with emitter, base, and collector terminals."
    },
    {
      "term": "FET",
      "def": "Field Effect Transistor, a voltage-controlled semiconductor device."
    },
    {
      "term": "Transducer",
      "def": "A device that converts one form of energy into another."
    }
  ],
  "topicExplainers": {
    "diodes": "<strong>Special Purpose Diodes:</strong> Zener diodes regulate voltage in reverse breakdown, while rectifier diodes convert AC to DC.",
    "transistors": "<strong>Transistors:</strong> BJTs have emitter, base, and collector regions and can work as switches or amplifiers.",
    "sensors": "<strong>Transducers:</strong> Sensors such as LDR, LVDT, LM35, thermocouples, and Hall effect sensors convert physical quantities into electrical signals."
  },
  "units": [
    {
      "id": 4,
      "title": "Special Purpose Diodes",
      "overview": "Zener diodes, rectification, LEDs, filters, voltage regulation, and p-n junction behavior.",
      "subtopics": [
        "Zener Diode",
        "Rectifier",
        "LED",
        "Filters",
        "Voltage Regulation"
      ],
      "estimatedTime": "4 hours",
      "revisionTips": [
        "Zener diode is used as a voltage regulator.",
        "Rectification converts AC into DC.",
        "PN junction conducts in forward bias."
      ],
      "formulas": [],
      "notes": []
    },
    {
      "id": 5,
      "title": "Transistors and FETs",
      "overview": "BJT structure, regions, configurations, current gain, switching, and FET basics.",
      "subtopics": [
        "BJT",
        "Emitter",
        "Base",
        "Collector",
        "Amplifier",
        "FET"
      ],
      "estimatedTime": "4 hours",
      "revisionTips": [
        "BJT stands for Bipolar Junction Transistor.",
        "Emitter is highly doped.",
        "FET is voltage controlled."
      ],
      "formulas": [
        {
          "expr": "Beta = Ic / Ib",
          "desc": "Common-emitter current gain"
        }
      ],
      "notes": []
    },
    {
      "id": 6,
      "title": "Sensors and Transducers",
      "overview": "Active/passive transducers, LVDT, piezoelectric devices, LDR, LM35, and Hall effect sensors.",
      "subtopics": [
        "Transducer",
        "LVDT",
        "LDR",
        "LM35",
        "Hall Effect",
        "Piezoelectric"
      ],
      "estimatedTime": "4 hours",
      "revisionTips": [
        "Active transducers are self-generating.",
        "LVDT measures displacement.",
        "LM35 is a temperature sensor."
      ],
      "formulas": [],
      "notes": []
    }
  ],
  "questions": [
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Why is there a sudden increase in current in Zener diode?",
      "opts": [
        "Due to the rupture of ionic bonds",
        "Due to rupture of covalent bonds",
        "Due to viscosity",
        "Due to potential difference"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "What is the semiconductor diode used as?",
      "opts": [
        "Oscillator",
        "Amplifier",
        "Rectifier",
        "Modulator"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "What is rectification?",
      "opts": [
        "Process of conversion of ac into dc",
        "Process of conversion of low ac into high ac",
        "Process of conversion of dc into ac",
        "Process of conversion of low dc into high dc"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "What is a Zener diode used as?",
      "opts": [
        "Oscillator",
        "Regulator",
        "Rectifier",
        "Filter"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "When a junction diode is reverse biased, what causes current across the junction?",
      "opts": [
        "Diffusion of charges",
        "Nature of material",
        "Drift of charges",
        "Both drift and diffusion of charges"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "What can a p-n junction diode be used as?",
      "opts": [
        "Condenser",
        "Regulator",
        "Amplifier",
        "Rectifier"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "In a PN junction with no external voltage, the electric field between acceptor and donor ion is called a",
      "opts": [
        "Peak",
        "Barrier",
        "Threshold",
        "Path"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "In a PN junction the potential barrier is due to the charges on either side of the junction, these charges are",
      "opts": [
        "Majority carriers",
        "Minority carriers",
        "Both (a) and (b)",
        "Fixed donor and accepter ions"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "The capacitance of a reverse-biased PN junction",
      "opts": [
        "Increases as reverse bias is increased",
        "Decreases as reverse bias is increased",
        "Increases as reverse bias is decreased",
        "Is significantly low"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "For a PN junction diode, the current in reverse bias maybe",
      "opts": [
        "Few milliamperes",
        "Between 0.2 A and 15 A",
        "Few amperes",
        "Few micro or nano amperes"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "When PN junction is in forward bias, by increasing the battery voltage",
      "opts": [
        "Circuit resistance increases",
        "Current through P_N junction increases",
        "Current through P_N junction decreases",
        "None of the above"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "When a PN junction is reverse biased",
      "opts": [
        "Holes and electrons tend to concentrate towards the junction",
        "The barrier tends to break down",
        "Holes and electrons tend to move away from the junction",
        "None of these"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "A PN junction",
      "opts": [
        "Has low resistance in forward as well as reverse directions",
        "Has high resistance in forward as well as reverse directions",
        "Conducts in the forward direction only",
        "Conducts in the reverse direction only"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "This combination creates A PN junction is said to be forward-biased when",
      "opts": [
        "The positive terminal of the battery is connected to P-side and the negative side to the N-side",
        "Junction is earthed",
        "N-side is connected directly to the p-side",
        "The positive terminal of the battery is connected to N-side and the negative side to the P-side."
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "PN Junction is also called ________.",
      "opts": [
        "diode",
        "transistor",
        "triode 17. 18. 19.",
        "inductor"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "The P-type region of diode is called ________.",
      "opts": [
        "cathode",
        "anode",
        "grid",
        "both a & b"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "How can we identify the positive and negative leads of a diode?",
      "opts": [
        "colour coding",
        "colour band",
        "both a & b",
        "none is correct"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "c) both a & b Explanation:We can identify the positive and negative leads of a diode by using colour coding colour band PN Junction diode is a _________ device.",
      "opts": [
        "one way",
        "two way",
        "double way",
        "b & c are correct"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "True Explanation:Germanium (Ge) has a potential barrier of 0.3 eV True / False The barrier potential of silicon is ________.",
      "opts": [
        ".3v",
        ".7v",
        ".5v",
        ".4v"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "b) 0.7 v Explanation:Silicon (Si) has a potential barrier of 0.7 eV The reverse saturation (Is) or maximum (Io) current during reverse bias of a PN junction diode depends on _________.",
      "opts": [
        "temperature",
        "doping level",
        "physical size of junction",
        "all are correct"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Zener diodes are also known as",
      "opts": [
        "Voltage regulators",
        "Forward bias diode",
        "Breakdown diode",
        "None of the mentioned"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Which of the following is true about the resistance of a Zener diode?",
      "opts": [
        "It has an incremental resistance",
        "It has dynamic resistance",
        "The value of the resistance is the inverse of the slope of the i-v characteristics of the Zener diode",
        "All of the mentioned"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Zener diode is designed to specifically work in which region without getting damaged?",
      "opts": [
        "Active region",
        "Breakdown region",
        "Forward bias",
        "Reverse bias"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "What is the level of doping in Zener Diode?",
      "opts": [
        "Lightly Doped",
        "Heavily Doped",
        "Moderately Doped",
        "No doping"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Zener Diode is mostly used as ____________",
      "opts": [
        "Half-wave rectifier",
        "Full-wave rectifier",
        "Voltage Regulator",
        "LED"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "The depletion region of the Zener diode is ____________",
      "opts": [
        "Thick",
        "Normal",
        "Very Thin",
        "Very thick 35. 36. 37."
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "A light emitting diode is _________",
      "opts": [
        "Heavily doped",
        "Lightly doped",
        "Intrinsic semiconductor",
        "Zener diode"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Which of the following materials can be used to produce infrared LED?",
      "opts": [
        "Si",
        "GaAs",
        "CdS",
        "PbS"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "What should be the band gap of the semiconductors to be used as LED?",
      "opts": [
        "0.5 eV",
        "1 eV",
        "1.5 eV",
        "1.8 eV"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "What should be the biasing of the LED?",
      "opts": [
        "Forward bias",
        "Reverse bias",
        "Forward bias than Reverse bias",
        "No biasing required"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Which process of the Electron-hole pair is responsible for emitting of light?",
      "opts": [
        "Generation",
        "Movement",
        "Recombination",
        "Diffusion"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Which of the following is not a characteristic of LED?",
      "opts": [
        "Fast action",
        "High Warm-up time",
        "Low operational voltage",
        "Long life"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "LEDs work on the principle of ______.",
      "opts": [
        "Electromagnetic induction",
        "Conduction",
        "Electroluminescence",
        "Induction"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Why is there a sudden increase in current in Zener diode",
      "opts": [
        "Due to the rupture of ionic bonds",
        "Due to rupture of covalent bonds",
        "Due to viscosity",
        "Due to potential difference"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "In a pure semiconductor crystal, if current flows due to breakage of crystal bonds, then what is the semiconductor is called?",
      "opts": [
        "Acceptor",
        "Donor",
        "Intrinsic semiconductor",
        "Extrinsic semiconductor"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "i-type semiconductors In a p-type semiconductor, germanium is doped with which of the following?",
      "opts": [
        "Gallium",
        "Copper",
        "Phosphorous",
        "Nitrogen"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Therefore, germanium is doped with gallium in a p-type semiconductor What are the majority charge carriers in P-type semiconductors?",
      "opts": [
        "Electrons",
        "Holes",
        "Negative Ions",
        "Positive Ions"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Which of the following is operated in forward bias?",
      "opts": [
        "LED",
        "Zener diode",
        "Photodiode 52.",
        "Solar cell"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "In a shunt capacitor filter, the mechanism that helps the removal of ripples is",
      "opts": [
        "The current passing through the capacitor",
        "The property of capacitor to store electrical energy",
        "The voltage variations produced by shunting the capacitor",
        "Uniform charge flow through the rectifier"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "The charge (q) lost by the capacitor during the discharge time for shunt capacitor filter.",
      "opts": [
        "IDC*T",
        "IDC/T",
        "IDC*2T",
        "IDC/2T"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Which of the following are true about capacitor filter?",
      "opts": [
        "It is also called as capacitor output filter",
        "It is electrolytic",
        "It is connected in parallel to load",
        "It helps in storing the magnetic energy"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "The capacitors are usually electrolytic even though they are large in size The rms ripple voltage (Vrms) of a shunt filter is",
      "opts": [
        "IDC/2sqrt3",
        "IDC2sqrt3",
        "IDC/sqrt3",
        "IDCsqrt3"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "What is the effect of an inductor filter on a multi frequency signal?",
      "opts": [
        "Dampens the AC signal",
        "Dampens the DC signal",
        "To reduce ripples",
        "To change the current"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "The inductor filter gives a smooth output because",
      "opts": [
        "It offers infinite resistance to ac components",
        "It offers infinite resistance to dc components",
        "Pulsating dc signal is allowed",
        "The ac signal is amplified"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "By using this property, the inductor offers an infinite resistance to ac components and gives a smooth output Which of the following can be a source of supply in dc power supplies?",
      "opts": [
        "Battery",
        "Dry cell",
        "Full wave rectifier",
        "All of the mentioned"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Which of the application's filters used for?",
      "opts": [
        "Reducing ripples",
        "Increasing ripples",
        "Increasing phase change",
        "Increasing amplitude"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Which of the following represent a change of output voltage when load current is increased?",
      "opts": [
        "Line regulation",
        "Load regulation",
        "Current regulation",
        "Voltage regulation"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Why zener diodes are provided in dc supply?",
      "opts": [
        "For forward conduction",
        "For reverse conduction",
        "For reference voltage",
        "For increasing amplitude"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Stability of output voltage is entirely depended on ______________",
      "opts": [
        "Stability of transformer",
        "Stability of zener diode",
        "Quality of wires",
        "Capacitor values 63 62."
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Which of the following are not the standard value of Zener diodes?",
      "opts": [
        "5.1 V",
        "5.6 V",
        "5.8V",
        "6.2V"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Which of the following can be used in series with a Zener diode so that combination has almost zero temperature coefficient?",
      "opts": [
        "Diode",
        "Resistor",
        "Transistor",
        "MOSFET"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "_________ is used for critical loads where temporary power failure can cause a great deal of inconvenience.",
      "opts": [
        "SMPS",
        "UPS",
        "MPS",
        "RCCB"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "__________ is used in the rotating type UPS system to supply the mains.",
      "opts": [
        "DC motor",
        "Self excited DC generator",
        "Alternator",
        "Battery bank"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Static UPS requires __________",
      "opts": [
        "only rectifier",
        "only inverter",
        "both inverter and rectifier",
        "none of the mentioned"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Usually __________ batteries are used in the UPS systems.",
      "opts": [
        "NC",
        "Li-On",
        "Lead acid",
        "All of the mentioned"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Uninterrupted Power Supply Explanation: The full form of UPS is Uninterrupted Power Supply Which electrical / electronic devicerequires ups?",
      "opts": [
        "Air conditioner",
        "Micro wave oven",
        "Computer",
        "Television"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "What is the number of capacitors and inductors used in a CLC filter?",
      "opts": [
        "1, 2 respectively",
        "2, 1 respectively",
        "1, 1 respectively",
        "2, 2 respectively"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Major part of the filtering is done by the first capacitor in a CLC filter because _________",
      "opts": [
        "The capacitor offers a very low reactance to the ripple frequency",
        "The capacitor offers a very high reactance to the ripple frequency",
        "The inductor offers a very low reactance to the ripple frequency",
        "The inductor offers a very high reactance to the ripple frequency"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "The inductor is placed in the L section filter because_________",
      "opts": [
        "It offers zero resistance to DC component",
        "It offers infinite resistance to DC component",
        "It bypasses the DC component",
        "It bypasses the AC component"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "In practice the output from the diode rectifier has",
      "opts": [
        "AC component only",
        "DC component only",
        "AC + DC component",
        "None of the mentioned"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Choose the correct statement",
      "opts": [
        "The AC component in the output of rectifier does the useful work",
        "The AC component in the output of rectifier increases the efficiency of the system",
        "The AC component in the output of rectifier causes ohmic losses",
        "The AC component in the output of rectifier does not affect the operation"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "An L filter is connected ________",
      "opts": [
        "in series",
        "in parallel",
        "in both series and parallel",
        "none of the mentioned"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "In case of an L filter connected with a rectifier in series with the load, it offers ________ impedance to ac whereas _______ resistance to dc respectively.",
      "opts": [
        "high, high",
        "high, low",
        "low, high",
        "low, low"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "In case of a C filter, the AC is not allowed to pass to the load by",
      "opts": [
        "offering it high impedance",
        "offering it low impedance",
        "short circuiting the AC component",
        "open circuiting the AC component 82 83"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "A capacitor filter or C filter can be used in a rectifier by connecting it",
      "opts": [
        "in parallel with the load",
        "in series with the load",
        "in parallel with the supply",
        "in series with the supply"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "In a shunt capacitor filter, the mechanism that helps the removal of ripples is_________",
      "opts": [
        "The current passing through the capacitor",
        "The property of capacitor to store electrical energy",
        "The voltage variations produced by shunting the capacitor",
        "Uniform charge flow through the rectifier"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "The cut-in point of a capacitor filter is_________",
      "opts": [
        "The instant at which the conduction starts",
        "The instant at which the conduction stops",
        "The time after which the output is not filtered",
        "The time during which the output is perfectly filtered"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "The rectifier current is a short duration pulses which cause the diode to act as a_________",
      "opts": [
        "Voltage regulator",
        "Mixer",
        "Switch",
        "Oscillator"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "The output waveform of CLC filter is superimposed by a waveform referred to as_________",
      "opts": [
        "Square wave",
        "Triangular wave",
        "Saw tooth wave",
        "Sine wave 87 88"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "In Zener diode, the Zener breakdown takes place",
      "opts": [
        "Below 6 V",
        "At 6 V",
        "Above 6 V",
        "None of the above"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "A Zener diode when biased correctly",
      "opts": [
        "Never overheats",
        "Has a constant voltage across it",
        "Acts as a fixed resistance",
        "Has a constant current passing through it"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Depletion region behaves as",
      "opts": [
        "Semiconductor",
        "Insulator",
        "Conductor",
        "High resistance"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "The advantages of a pi-flter is_________",
      "opts": [
        "low output voltage",
        "low PIV",
        "low ripple factor",
        "high voltage regulation"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "The basic purpose of flter at the output of a rectifer is to",
      "opts": [
        "minimize variations in ac input signal",
        "suppress harmonics in rectifed output",
        "remove ripples from the rectifed output",
        "stabilize dc output voltage"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "What is correct about the ripple factor of LC flter?",
      "opts": [
        "Increases with the load current",
        "increases with the load resistance",
        "remains constant with the load current",
        "has the lowest value"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "d) within 1% Explanation: Commercial power regulation within 1% In an unregulated power supply, if load current increases, the output voltage __________ supplies have voltage",
      "opts": [
        "Remains the same",
        "Decreases",
        "Increases",
        "None of the above"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "What is the regulated output voltage?",
      "opts": [
        "15 V",
        "5 V",
        "30 V",
        "45 V"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "The voltage regulator output impedance is _______",
      "opts": [
        "Very small",
        "Large",
        "Infinite",
        "None"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 4,
      "topic": "Unit 4 Review",
      "q": "Which of the following is true about the temperature coefficient or TC of the Zener diode?",
      "opts": [
        "For Zener voltage less than 5V, TC is negative",
        "For Zener voltage around 5V, TC can be made zero",
        "For higher values of Zener voltage, TC is positive",
        "All of the mentioned"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "BJT stands for __________",
      "opts": [
        "Bi-Junction Transfer",
        "Blue Junction Transistor",
        "Bipolar Junction Transistor",
        "Base Junction Transistor"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "The doped region in a transistor are ________",
      "opts": [
        "Emitter and Collector",
        "Emitter and Base",
        "Collector and Base",
        "Emitter, Collector and Base"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Which region of the transistor is highly doped?",
      "opts": [
        "Emitter",
        "Base",
        "Collector",
        "Both Emitter and Collector"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "If Ie is the current entering the emitter, Ib is the current leaving the base and Ic is the current leaving the collector in a p-n-p transistor used for amplification, what is the relation between Ie, Ib and Ic?",
      "opts": [
        "Ie <Ic",
        "Ic <Ib",
        "Ib <Ic",
        "Ie <Ib + Ic"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "A low input to the transistor gives __________",
      "opts": [
        "Low output",
        "High Output",
        "Normal Output",
        "No Output"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "From the output characteristics of a transistor, one cannot calculate __________",
      "opts": [
        "IB",
        "VBE",
        "Ic",
        "VCE"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "What is the expression for the Current Amplification factor?",
      "opts": [
        "DeltaIcDeltaVc",
        "DeltaVcDeltaIc",
        "(DeltaICDeltaIB)VCE",
        "(DeltaICDeltaIB)VBE"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "A transistor has ........",
      "opts": [
        "one pn junction",
        "two pn junctions",
        "three pn junctions",
        "four pn junctions"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "The number of depletion layers in a transistor is ........",
      "opts": [
        "four",
        "three",
        "one",
        "two"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "The element that has the biggest size in a transistor is ........",
      "opts": [
        "collector",
        "base",
        "emitter",
        "collector-base junction"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "the biggest component in the",
      "opts": [
        "acceptor ions",
        "donor ions",
        "free electrons",
        "holes"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "operated device.",
      "opts": [
        "current",
        "voltage",
        "both voltage and current",
        "none of the above"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "In an npn transistor,-------are the minority carriers",
      "opts": [
        "free electrons",
        "holes",
        "donor ions",
        "acceptor ions"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "In a transistor, the base current is about ........of emitter current.",
      "opts": [
        "25%",
        "20%",
        "35%",
        "5%"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "\u0000 \u0000 \u0000 \u0000 \u0000 \u0000",
      "opts": [
        "high",
        "low",
        "very high",
        "almost zero"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "arrangement.",
      "opts": [
        "common emitter",
        "common base",
        "common collector",
        "none of the above"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "region",
      "opts": [
        "Inverted mode",
        "Active",
        "Cut off",
        "Saturation"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "For a BJT, for common base configuration the input characteristics are represented by a plot between which of the following parameters?",
      "opts": [
        "VBE and IE",
        "VBE and IB 27. 28.",
        "VCE and IC",
        "VCC and IC"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "In a BJT, if the collector-base junction is reverse-biased and the base-emitter junction is forward-biased, which region is the BJT operating in?",
      "opts": [
        "Saturation region",
        "Active region",
        "Cutoff region",
        "Reverse active region"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "In a BJT, if the collector-base junction is forward-biased and the base-emitter junction is forward-biased, which region is the BJT operating in?",
      "opts": [
        "Saturation region",
        "Active region",
        "Cutoff region",
        "Reverse active region"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "In a BJT, if the collector-base junction and the base-emitter junction are both reverse-biased, which region is the BJT operating in?",
      "opts": [
        "Saturation region",
        "Active region",
        "Cutoff region",
        "Reverse active region"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "In P-N-P transistor, base will be of",
      "opts": [
        "P material",
        "N material",
        "Either of the above",
        "None of the above"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "b) N material Explanation:The transistor in which one n-type material is doped with two p-type materials such type of transistor is known as PNP transistor.Base will be of N type material A P-N-P transistor has",
      "opts": [
        "Only acceptor ions",
        "Only donor ions",
        "Two P-regions and one N-region",
        "Three P-N junction"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Which type of amplifiers exhibits the current gain approximately equal to unity without any current amplification?",
      "opts": [
        "CE",
        "CB",
        "CC",
        "Cascade"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "The configuration in which voltage gain of transistor amplifier is lowest is ____________",
      "opts": [
        "common collector",
        "common emitter",
        "common base",
        "common emitter & base"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "The configuration in which current gain of transistor amplifier is lowest is ___________",
      "opts": [
        "common collector",
        "common base",
        "common emitter",
        "common emitter & base"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "The configuration in which input impedance of transistor amplifier is lowest is ___________",
      "opts": [
        "common collector",
        "common emitter",
        "common base",
        "common emitter & base"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "The configuration in which output impedance of transistor amplifier is highest is ___________",
      "opts": [
        "common collector",
        "common base",
        "common emitter 37. 38.",
        "common collector and base"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "In which region a transistor acts as an open switch?",
      "opts": [
        "cut off region",
        "inverted region",
        "active region",
        "saturated region"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "In which region a transistor acts as a closed switch?",
      "opts": [
        "cut off region",
        "inverted region",
        "active region",
        "saturated region"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "The current which is helpful for LED to turn on is_________",
      "opts": [
        "emitter current",
        "base current",
        "collector current",
        "depends on bias"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Which of the following statements is true?",
      "opts": [
        "Solid state switches are applications for an AC output",
        "LED's can be driven by transistor logics",
        "Only NPN transistor can be used as a switch",
        "Transistor operates as a switch only in active region"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "The base emitter voltage in a cut off region is_________",
      "opts": [
        "greater than 0.7V",
        "equal to 0.7V",
        "less than 0.7V",
        "cannot be predicted"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "For a PNP transistor, the emitter potential must be negative with respect to the base In saturation region, the depletion layer_________",
      "opts": [
        "increases linearly with carrier concentration",
        "decreases linearly with carrier concentration",
        "increases by increasing the emitter current",
        "decreases by decreasing the emitter voltage drop"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "The base emitter voltage in a saturation region is_________",
      "opts": [
        "greater than 0.7V",
        "equal to 0.7V",
        "less than 0.7V",
        "cannot be predicted"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "The switching of power with a PNP transistor is called_________",
      "opts": [
        "sourcing current",
        "sinking current",
        "forward sourcing",
        "reverse sinking"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "The switching of power with a NPN transistor is called_________",
      "opts": [
        "sourcing current",
        "sinking current",
        "forward sourcing",
        "reverse sinking"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Which of the following is not a part of a BJT?",
      "opts": [
        "Base",
        "Collector",
        "Emitter",
        "None of the mentioned"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "In which of the following modes can a BJT be used?",
      "opts": [
        "Cut-off mode",
        "Active mode",
        "Saturation mode",
        "All of the mentioned"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "If a BJT is to be used as a switch, it must operate in____________",
      "opts": [
        "Cut-off mode or active mode",
        "Active Mode or saturation mode",
        "Cut-off mode or saturation mode",
        "Cut-off mode or saturation mode or active mode"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "In cut off mode",
      "opts": [
        "The base-emitter junction is forward biased and emitter- collector junction is reversed biased",
        "The base-emitter junction is forward biased and emitter- collector junction is forward biased",
        "The base-emitter junction is reversed biased and emitter- collector junction is reversed biased",
        "The base-emitter junction is reversed biased and emitter- collector junction is forward biased"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "On which of the following does the collector current not depends upon?",
      "opts": [
        "Saturation current",
        "Thermal voltage",
        "Voltage difference between the base and emitter",
        "None of the mentioned"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Where is the input measured in a common base transistor physical model?",
      "opts": [
        "Collector terminal",
        "Emitter terminal",
        "Base terminal",
        "Ground"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Which parameter of the physical model is varied while measuring the input characteristics of a common-base transistor?",
      "opts": [
        "Emitter current",
        "Emitter voltage",
        "Collector current",
        "Emitter base voltage"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Where is the output measured in a common base transistor physical model?",
      "opts": [
        "Collector terminal",
        "Emitter terminal",
        "Base terminal",
        "Ground"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Which parameter of the physical model is varied while measuring the output characteristics of a common-base transistor?",
      "opts": [
        "Emitter current",
        "Emitter voltage",
        "Collector current",
        "Collector base voltage"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "How do you calculate the dynamic input resistance of a CB transistor?",
      "opts": [
        "DeltaVBE / DeltaIC",
        "DeltaVBE / DeltaIE",
        "DeltaVCB / DeltaIC",
        "DeltaVCB / DeltaIE"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "What is the collector current?",
      "opts": [
        "25 micro ampere",
        "10 micro ampere",
        "2.5 milli ampere",
        "10 milli ampere"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "What happens to the collector current if the emitter current increases while no base voltage is applied?",
      "opts": [
        "Increases",
        "Decreases",
        "No current",
        "First increases then decreases 57. 58."
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Which is an example of bipolar junction transistor?",
      "opts": [
        "BC547B",
        "CMCP793V-500",
        "SLB700A/06VA",
        "MBR5H100MFST1G"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "What is the minimum voltage required to make base emitter junction of a real silicon bipolar junction transistor in forward biased?",
      "opts": [
        "0.7 volts",
        "1.8 volts",
        "2.3 volts",
        "0.3 volts"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "What are the parameters over which transfer characteristics curve of bipolar junction transistor is made in common emitter configuration?",
      "opts": [
        "Emitter Current and time",
        "Emitter Voltage and time",
        "Collector Current and frequency",
        "Collector to Emitter Voltage and Collector current 63 62."
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "What is the collector current?",
      "opts": [
        "25 micro ampere",
        "0.8 micro ampere",
        "0.8 milli ampere",
        "10 milli ampere"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Which of the following statement is true about FET?",
      "opts": [
        "It has high output impedance",
        "It has high input impedance",
        "It has low input impedance",
        "It does not offer any resistance"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Comparing the size of BJT and FET, choose the correct statement?",
      "opts": [
        "BJT is larger than the FET",
        "BJT is smaller than the FET",
        "Both are of same size",
        "Depends on application"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "What is the main advantage of FET which makes it more useful in industrial applications?",
      "opts": [
        "Voltage controlled operation",
        "Less cost",
        "Small size",
        "Semiconductor device"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "For a FET when will maximum current flows?",
      "opts": [
        "Vgs = 0V",
        "Vgs = 0v and Vds >= |Vp|",
        "VDS >= |Vp|",
        "Vp = 0"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "b Explanation: For a FET the current reaches maximum that is IDSS occurs when Vgs = 0V and VDS >= |Vp| What is the value of current when the gate to source voltage is less than the pinch off voltage?",
      "opts": [
        "1A",
        "5A",
        "100A",
        "0"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "What is the value of drain current when Vgs=pinch off voltage?",
      "opts": [
        "0A",
        "1A",
        "2A",
        "Cannot be determined"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "To use FET as a voltage controlled resistor, in which region it should operate?",
      "opts": [
        "Ohmic region",
        "cut off",
        "Saturation",
        "cut off and saturation"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "a) Ohmic region Explanation: By varying the gate to source voltage, Resistance can be varied as follows rd = ro/(1-V2gs/Vp) For an n-channel FET, What is the direction of current flow?",
      "opts": [
        "Source to drain",
        "Drain to source",
        "Gate to source",
        "Gate to drain"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "For a p-channel FET, What is the direction of current flow?",
      "opts": [
        "Source to drain",
        "Drain to source",
        "Gate to source",
        "Gate to drain"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Field effect transistors are known as",
      "opts": [
        "unipolar device",
        "bipolar device",
        "tripolar device",
        "multipolar device"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Field effect transistor's conductivity is regulated by",
      "opts": [
        "input current",
        "output current",
        "terminal voltage",
        "supply voltage"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "In FET, the current enters the channel through",
      "opts": [
        "source",
        "drain",
        "gate",
        "nodes"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Which terminal bias the transistor to operation?",
      "opts": [
        "source",
        "drain",
        "gate",
        "base"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Which terminal controls the electron flow passage?",
      "opts": [
        "source",
        "drain",
        "gate",
        "base"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "The expansion of depletion region in n-channel device makes the channel",
      "opts": [
        "narrow",
        "wide",
        "does not affect the channel 84 85 86",
        "cannot be determined"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Which voltage increases the channel size?",
      "opts": [
        "negative Vgs",
        "positive Vgs",
        "negative Vds",
        "positive Vds"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Which mode of operation of FET is used, when amplification is needed?",
      "opts": [
        "active",
        "saturation",
        "non saturation",
        "linear"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Which of the following relation is true about gate current?",
      "opts": [
        "IG=ID+IS",
        "ID=IG",
        "IS= IG",
        "IG=0"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "For a fixed bias circuit the drain current was 1mA, what is the value of source current?",
      "opts": [
        "0mA",
        "1mA",
        "2mA",
        "3mA"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "For a fixed bias circuit the drain current was 1mA, VDD=12V, determine drain resistance required if VDS=10V?",
      "opts": [
        "1K",
        "1.5K",
        "2K",
        "4K"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "Field effect transistors are different from BJTs in that they are _________",
      "opts": [
        "monopolar devices",
        "bipolar devices",
        "bidirectional device",
        "none of the mentioned"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "JFET is a ______ carrier device.",
      "opts": [
        "Unipolar",
        "Bipolar",
        "Minority",
        "Majority"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "he n-channel JFET, the pinch off voltage is ______________",
      "opts": [
        "not greater than 0",
        "greater than or equal to 0",
        "less than or equal to 0",
        "not less than 0"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "An N-channel JFET is ___________",
      "opts": [
        "Always ON",
        "Always OFF",
        "Enhancement mode JFET",
        "Has a p-type substrate"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "b) input is reverse biased Explanation:A JFET has high input impedance becauseinput is reverse biased JFET in properly biased condition acts as a",
      "opts": [
        "current controlled current source",
        "voltage controlled voltage source",
        "voltage controlled current source",
        "impedance controlled current source"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "c) voltage controlled current source Explanation:JFET in properly biased condition acts as avoltage controlled current source 100 The input resistance of a FET is of the order of",
      "opts": [
        "100",
        "10 k",
        "1 M",
        "100 M"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 5,
      "topic": "Unit 5 Review",
      "q": "FET is which type of device?",
      "opts": [
        "4 terminal voltage controlled device",
        "3 terminal voltage controlled device",
        "3 terminal current controlled device",
        "2 terminal current controlled device"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following is not a characteristic of an ideal transducer?",
      "opts": [
        "High dynamic range",
        "Low linearity",
        "High repeatability",
        "Low noise"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following represent active transducer?",
      "opts": [
        "Strain gauge",
        "Thermistor",
        "LVDT",
        "Thermocouple"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which transducer is known as 'self-generating transducer'?",
      "opts": [
        "Active transducer",
        "Passive transducer",
        "Secondary transducer",
        "Analog transducer"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following is an analog transducer?",
      "opts": [
        "Encoders",
        "Strain gauge",
        "Digital tachometers",
        "Limit switches"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "What is the principle of operation of LVDT?",
      "opts": [
        "Mutual inductance",
        "Self-inductance",
        "Permanence",
        "Reluctance"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following can be measured using Piezo-electric transducer?",
      "opts": [
        "Velocity",
        "Displacement",
        "Force",
        "Sound"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Capacitive transducer is used for?",
      "opts": [
        "Static measurement",
        "Dynamic measurement",
        "Transient measurement",
        "Both static and dynamic"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following is used in photo conductive cell?",
      "opts": [
        "Selenium",
        "Quartz",
        "Rochelle salt",
        "Lithium sulphate"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "What are transducers?",
      "opts": [
        "They convert power from one form to another",
        "They convert work from one form to another",
        "They convert work to power",
        "They convert energy from one form to another"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "What type of energy conversion does a piezoelectric transducer perform?",
      "opts": [
        "It converts mechanical energy to sound energy",
        "It converts sound energy to mechanical energy",
        "It converts mechanical energy to electrical energy",
        "It converts electrical energy to mechanical energy"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "The IC LM35 is used as which type of sensor?",
      "opts": [
        "Pressure sensor",
        "Temperature sensor",
        "Light sensor",
        "Mechanical sensor"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "What is the range of frequency of the waves produced by the Ultrasonic transducer?",
      "opts": [
        "20 Kilohertz to several Gigahertz",
        "1 Kilohertz to several Gigahertz",
        "40 Kilohertz to several Megahertz",
        "less than 20 Kilohertz"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "What is the full form of LVDT with respect to displacement transducer?",
      "opts": [
        "Linear variable differential temperature",
        "Linear variable differential transformer",
        "Liquid visible differential transformer",
        "Liquified visible differential transformer"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "What is the effect on properties of LDR when light falls on it?",
      "opts": [
        "Its resistance remains same",
        "Its resistance changes",
        "Its capacitance changes",
        "Its inductance changes"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "What is measured by a hall effect transducer?",
      "opts": [
        "Electric flux",
        "Electric Field",
        "Magnetic field",
        "Temperature"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following represents the application of inductive transducers?",
      "opts": [
        "Displacement measurement",
        "Thickness measurement",
        "Both displacement and thickness measurement",
        "None of the mentioned"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Inductive potentiometers are used to measure ________________",
      "opts": [
        "Voltage",
        "Current",
        "Displacement",
        "None of the mentioned"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Capacitive transducers can be used by _______________",
      "opts": [
        "Measuring change in distance between plates",
        "Measuring change in area of plates",
        "Change in a dielectric material",
        "All of the mentioned"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following is correct for the capacitive transducer?",
      "opts": [
        "Capacitive strain gauges",
        "Capacitive tachometers",
        "Capacitive pressure transducer",
        "All of the mentioned"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "For a material capacitance increases with _____________",
      "opts": [
        "Decrease in area of plates, all other factors constant",
        "Increase in distance between plates, all other factors constant",
        "Decrease in distance between plates, all other factors constant",
        "None of the mentioned"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following quantities cannot be measured by capacitive transducers?",
      "opts": [
        "Displacement",
        "Speed",
        "Moisture",
        "None of the mentioned"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Who invented the piezoelectric effect?",
      "opts": [
        "Mary Elizabeth Barber",
        "Christian Doppler",
        "Marie curie and Pierre curie",
        "Pierre curie and Jacques curie"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following represents piezoelectric materials?",
      "opts": [
        "ADP",
        "Quartz",
        "Bernilite",
        "All of the mentioned"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following quantities cannot be measured using piezoelectric transducers?",
      "opts": [
        "Pressure",
        "Strain",
        "Acceleration",
        "None of the mentioned 28. 29. 30. 31."
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "In piezoelectric strain transducer voltage developed is _______________ to strain applied.",
      "opts": [
        "Directly proportional",
        "Inversely proportional",
        "Equal",
        "Independent"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "In photo emissive transducers, electrons are attracted by ___________",
      "opts": [
        "Cathode",
        "Anode",
        "Grid",
        "Body"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following materials can be used as photoconductive transducer?",
      "opts": [
        "Selenium",
        "Silicon",
        "Germanium",
        "All of the mentioned"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Semiconductor layer using silicon and germanium is known as _______________",
      "opts": [
        "Photo diodes",
        "Photo junction diodes",
        "Photo material 35. 36. 37.",
        "Photo sensitive materials"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following are used to form photo transistors?",
      "opts": [
        "Two photo diodes",
        "Three photo diodes",
        "Normal diodes",
        "None of the mentioned"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Thermocouple is a ______________",
      "opts": [
        "Primary device",
        "Secondary transducer",
        "Tertiary transducer",
        "None of the mentioned"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Operation of thermocouple is governed by _______________",
      "opts": [
        "Peltier effect",
        "Seebeck effect",
        "Thomson effect",
        "All of the mentioned"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Active transducers are classified into ____________",
      "opts": [
        "4 types",
        "2 types",
        "6 types",
        "8 types"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Active transducers develops ______________",
      "opts": [
        "mechanical parameter",
        "electrical parameter",
        "chemical parameter",
        "physical parameter"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "How do passive transducers develop electrical signals?",
      "opts": [
        "using a transformer",
        "using internal source",
        "using external source",
        "using a diode"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Capacitive transduction involves ___________",
      "opts": [
        "change in resistance",
        "change in inductance",
        "change in resistance",
        "change in capacitance"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "In electromagnetic based transduction measurand is ___________",
      "opts": [
        "converted into mechanical force",
        "converted into electromotive force",
        "converted into chemical force",
        "converted into physical force"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Inductive transduction involves ___________",
      "opts": [
        "change in self-inductance 45. 46. 47.",
        "change in capacitance",
        "change in mutual inductance",
        "change in resistance"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Photovoltaic transduction involves ___________",
      "opts": [
        "voltage generation heat",
        "voltage generation through sound",
        "voltage generation through light",
        "voltage generation current"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Analog transducers convert input into ___________",
      "opts": [
        "voltage",
        "current",
        "digital",
        "analog"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Transducers must operate under ___________",
      "opts": [
        "zero electromagnetic field",
        "constant electromagnetic fields",
        "varying electromagnetic fields",
        "infinite electromagnetic field"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "How many passive transducers are there?",
      "opts": [
        "1",
        "3",
        "5",
        "7"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Smallest change which a sensor can detect is ____________",
      "opts": [
        "Resolution",
        "Accuracy",
        "Precision",
        "Scale"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Thermocouple generate output voltage according to ____________",
      "opts": [
        "Circuit parameters",
        "Humidity",
        "Temperature",
        "Voltage"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following is not an analog sensor?",
      "opts": [
        "Potentiometer",
        "Force-sensing resistors",
        "Accelerometers",
        "None of the mentioned"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "A ________ is thermally sensitive resistor that exhibits a large change in resistance.",
      "opts": [
        "Thermistor",
        "Resistance Thermometer",
        "Thermo couple",
        "Semiconductor based sensor"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "________ measures temperature by correlating the resistance of the RTD with temperature.",
      "opts": [
        "Thermistor",
        "Resistance Thermometer",
        "Thermo couple",
        "Semiconductor based sensor"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "________ consists of two different metals connected at two points.",
      "opts": [
        "Thermistor",
        "Resistance Thermometer",
        "Thermocouple",
        "Semiconductor based sensor"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which type of temperature sensor is placed in Integrated Circuits?",
      "opts": [
        "Thermistor",
        "Resistance Thermometer",
        "Thermocouple",
        "Semiconductor based sensor"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which sensor is linear and low accuracy?",
      "opts": [
        "Thermistor",
        "Resistance Thermometer",
        "Thermocouple",
        "Semiconductor based sensor"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Inverse transducers are also known as _________________",
      "opts": [
        "Open loop transducers",
        "Closed loop transducers",
        "Input transducers",
        "Output transducers"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Inverse transducer is system which converts _________________",
      "opts": [
        "Electrical quantity to non-electrical quantity",
        "Non-electrical quantity to electrical quantity",
        "Electrical quantity to electrical quantity itself",
        "Non- electrical quantity to non-electrical quantity itself"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following is an inverse transducer _____________",
      "opts": [
        "Piezoelectric transducer",
        "LVDT",
        "Load cell",
        "Bourdon tube"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following cannot act as inverse transducer?",
      "opts": [
        "Quartz",
        "Barium titanate",
        "Lead zirconate",
        "Cadmium"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which type of transducer requires energy to be put into it in order to translate changes due to the measurand?",
      "opts": [
        "active transducers",
        "passive transducers",
        "powered transducers",
        "local transducers"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Active transducers work on the principle of ________",
      "opts": [
        "energy conversion",
        "mass conversion",
        "energy alteration",
        "volume conversion"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Accuracy is ______",
      "opts": [
        "ability of the transducer or sensor to see small differences in reading",
        "ability of the transducer or sensor to see small differences in reading",
        "algebraic difference between the indicated value and the true or theoretical value of the measurand",
        "total operating range of the transducer"
      ],
      "ans": 2,
      "explain": "The correct answer is option C.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "The smallest change in measurant that will result in a measurable change in the transducer output is called _______",
      "opts": [
        "offset",
        "linearity",
        "resolution",
        "threshold 68 69"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Unwanted signal at the output due either to internal sources or to interference is called ________",
      "opts": [
        "offset",
        "noise",
        "drift",
        "threshold"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "The ability of the sensor to see small differences in reading is called ______",
      "opts": [
        "resolution",
        "drift",
        "offset",
        "linearity"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Linearity of transducer is ___________",
      "opts": [
        "Closeness of the transducer's calibration curve to a special curved line within a given percentage of full scale output",
        "Closeness of the transducer's calibration curve to a special straight line within a given percentage of full scale output",
        "Closeness of the transducer's calibration curve to a special straight line within a given percentage of half scale output",
        "Closeness of the transducer's calibration curve to a special curved within a given percentage of half scale output"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "What is the principle behind photoelectric transducers?",
      "opts": [
        "Conversion of wind energy to electrical energy",
        "conversion of light energy to electrical energy",
        "conversion of mechanical energy to electrical energy",
        "conversion of electrical energy to light energy"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following material is used to build photovoltaic cells?",
      "opts": [
        "Selenium",
        "celenuim",
        "silicon",
        "iron"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Photo-diodes work in _________",
      "opts": [
        "forward biased",
        "reverse biased",
        "independent of forward and reverse biasing",
        "any configuration"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Thermistor is used to measure ____________",
      "opts": [
        "temperature",
        "pressure",
        "height",
        "displacement"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Inverse transducer is system which converts _________________",
      "opts": [
        "Electrical quantity to non-electrical quantity",
        "Non-electrical quantity to electrical quantity",
        "Electrical quantity to electrical quantity itself",
        "Non- electrical quantity to non-electrical quantity itself 83 84 85"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Which of the following has the widest range of temperature measurement?",
      "opts": [
        "RTD",
        "Thermocouple",
        "Thermistor",
        "Mercury thermometer"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "When two wires of different material are joined together at either end, forming two junctions which are maintained at a different temperature, a _________ force is generated.",
      "opts": [
        "thermo-motive",
        "electro-motive",
        "chemical reactive",
        "mechanical 89 90"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "The lower temperature junction in thermocouple is maintained at ________",
      "opts": [
        "-273 K",
        "0 K",
        "-327 K",
        "273 K"
      ],
      "ans": 3,
      "explain": "The correct answer is option D.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "RTD stands for ________",
      "opts": [
        "resistance temperature device",
        "resistance temperature detector",
        "reluctance thermal device",
        "resistive thermal detector"
      ],
      "ans": 1,
      "explain": "The correct answer is option B.",
      "difficulty": "medium"
    },
    {
      "unit": 6,
      "topic": "Unit 6 Review",
      "q": "Thermister is used to measure _____________",
      "opts": [
        "temperature",
        "pressure",
        "height",
        "displacement"
      ],
      "ans": 0,
      "explain": "The correct answer is option A.",
      "difficulty": "medium"
    }
  ]
});
