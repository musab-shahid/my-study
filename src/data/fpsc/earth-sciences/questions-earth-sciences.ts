// questions-earth-sciences.ts — FPSC Earth Sciences question bank
// MCQs authored from standard, well-established Earth science curriculum content.
// Generated in batches aligned with sections in topics-earth-sciences.ts.


import type { Question } from '@/types';


export const questions: Question[] = [
// ════════════════════════════════════════════════════════════════════
// EARTH-A: Earth as a Planet & Internal Structure
// ════════════════════════════════════════════════════════════════════


// ── Topic earth-a1: Earth's Shape, Size & Motions ──


{ id: "EARTH-01-Q001", sectionId: "EARTH-01", topicId: "earth-a1", difficulty: "easy", type: "single",
  question: "The shape of Earth is best described as:",
  options: ["A perfect sphere", "An oblate spheroid", "A prolate spheroid", "A true ellipsoid with three unequal axes"],
  correctAnswer: 1,
  explanation: "Earth is an oblate spheroid — flattened at the poles and bulging at the equator due to rotation. It is not perfectly spherical and not prolate (elongated at the poles).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q002", sectionId: "EARTH-01", topicId: "earth-a1", difficulty: "easy", type: "single",
  question: "Which of the following is the correct average (mean) radius of Earth?",
  options: ["6,357 km", "6,371 km", "6,378 km", "6,400 km"],
  correctAnswer: 1,
  explanation: "Mean radius = 6,371 km. Equatorial radius is 6,378 km and polar radius is 6,357 km; the mean lies between them.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q003", sectionId: "EARTH-01", topicId: "earth-a1", difficulty: "medium", type: "single",
  question: "Earth's axis is tilted at an angle of approximately:",
  options: ["15.5°", "23.5°", "30°", "45°"],
  correctAnswer: 1,
  explanation: "Earth's axial tilt (obliquity) is approximately 23.5° relative to the plane of its orbit. This tilt is the primary cause of the seasons.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q004", sectionId: "EARTH-01", topicId: "earth-a1", difficulty: "easy", type: "true_false",
  question: "Earth's equatorial diameter is greater than its polar diameter.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Because Earth is an oblate spheroid, its equatorial diameter (~12,756 km) is greater than its polar diameter (~12,714 km), a difference of about 42 km.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q005", sectionId: "EARTH-01", topicId: "earth-a1", difficulty: "medium", type: "single",
  question: "Precession of Earth's axis refers to:",
  options: ["A daily rotation around the polar axis", "A slow conical wobble of the axis over ~26,000 years", "A change in axial tilt from 23.5° to 0°", "The orbital revolution around the Sun"],
  correctAnswer: 1,
  explanation: "Precession is the slow conical wobble of Earth's rotational axis caused by gravitational torques from the Sun and Moon. It does not change the tilt angle, only the direction the axis points, with a period of about 26,000 years.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q006", sectionId: "EARTH-01", topicId: "earth-a1", difficulty: "hard", type: "single",
  question: "A solar day on Earth is approximately 4 minutes longer than a sidereal day. This is because:",
  options: ["Earth's rotation is slowing due to tidal friction", "Earth's axis is tilted at 23.5°", "Earth moves along its orbit while rotating, requiring extra rotation to bring the Sun back to the same position", "The Sun's apparent diameter changes throughout the year"],
  correctAnswer: 2,
  explanation: "During one sidereal day (23 h 56 min), Earth rotates exactly 360° relative to the stars. But because Earth has also moved along its orbit, it must rotate slightly more than 360° to bring the Sun back to the same position in the sky, giving a solar day of 24 h — about 4 minutes longer.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q007", sectionId: "EARTH-01", topicId: "earth-a1", difficulty: "easy", type: "single",
  question: "Earth completes one revolution around the Sun in approximately:",
  options: ["24 hours", "27.3 days", "365.25 days", "26,000 years"],
  correctAnswer: 2,
  explanation: "Earth's orbital period (revolution around the Sun) is approximately 365.25 days. The extra 0.25 day is why we have a leap year every 4 years.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q008", sectionId: "EARTH-01", topicId: "earth-a1", difficulty: "medium", type: "single",
  question: "Which of the following BEST describes the cause of Earth's oblate spheroid shape?",
  options: ["Tidal forces from the Moon", "Centrifugal force from rotation, greatest at the equator", "Uneven heating by the Sun", "Earth's magnetic field"],
  correctAnswer: 1,
  explanation: "Earth's rotation produces a centrifugal acceleration that is strongest at the equator (where linear speed is highest) and zero at the poles, causing the equatorial bulge. Tidal forces are far too weak to deform the whole planet.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q009", sectionId: "EARTH-01", topicId: "earth-a1", difficulty: "hard", type: "single",
  question: "The period of nutation is approximately:",
  options: ["18.6 years", "260 years", "2,600 years", "26,000 years"],
  correctAnswer: 0,
  explanation: "Nutation has a period of about 18.6 years (driven by the Moon's inclined orbit). Precession has a much longer period of ~26,000 years — common confusion in exams.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-a2: Earth's Magnetic Field ──


{ id: "EARTH-01-Q010", sectionId: "EARTH-01", topicId: "earth-a2", difficulty: "easy", type: "single",
  question: "Earth's magnetic field is generated primarily by:",
  options: ["Rotation of the solid inner core", "Movement of molten iron in the outer core", "The lithospheric plates", "Solar radiation interacting with the atmosphere"],
  correctAnswer: 1,
  explanation: "Earth's magnetic field is generated by the geodynamo — the movement of electrically conducting liquid iron in the outer core, combined with Earth's rotation.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q011", sectionId: "EARTH-01", topicId: "earth-a2", difficulty: "medium", type: "single",
  question: "Magnetic declination is defined as:",
  options: ["The angle the magnetic field makes with the horizontal surface", "The horizontal angle between true north and magnetic north", "The angle between Earth's axis and the ecliptic", "The vertical angle below the horizontal"],
  correctAnswer: 1,
  explanation: "Declination is the horizontal angle between true (geographic) north and magnetic north. It varies with location and changes over time.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q012", sectionId: "EARTH-01", topicId: "earth-a2", difficulty: "medium", type: "single",
  question: "Magnetic inclination (dip angle) is 0° at the:",
  options: ["Magnetic poles", "Magnetic equator", "Geographic north pole", "Tropic of Cancer"],
  correctAnswer: 1,
  explanation: "At the magnetic equator, magnetic field lines are parallel to Earth's surface, so a compass needle (which aligns with field lines) lies horizontal, giving an inclination of 0°.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q013", sectionId: "EARTH-01", topicId: "earth-a2", difficulty: "hard", type: "true_false",
  question: "The Magnetic North Pole of Earth is, in physics terms, actually a magnetic SOUTH pole.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. By convention, the 'Magnetic North Pole' is the point where the field points vertically downward, which means it attracts the north-seeking end of a compass needle. Since opposite poles attract, this point is in physics terms a magnetic south pole.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q014", sectionId: "EARTH-01", topicId: "earth-a2", difficulty: "medium", type: "single",
  question: "Which of the following provides the strongest evidence for seafloor spreading?",
  options: ["Submarine canyons", "Symmetric magnetic stripes on either side of mid-ocean ridges", "Ocean trench depth", "Tidal patterns"],
  correctAnswer: 1,
  explanation: "Symmetric magnetic stripes on either side of mid-ocean ridges record reversals of Earth's magnetic field as new crust forms and spreads outward — key evidence for seafloor spreading.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q015", sectionId: "EARTH-01", topicId: "earth-a2", difficulty: "easy", type: "single",
  question: "The most recent reversal of Earth's magnetic field (Brunhes–Matuyama) occurred approximately:",
  options: ["78,000 years ago", "780,000 years ago", "7.8 million years ago", "78 million years ago"],
  correctAnswer: 1,
  explanation: "The Brunhes–Matuyama reversal occurred approximately 780,000 years ago, marking the start of the current magnetic polarity period (Brunhes Chron).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q016", sectionId: "EARTH-01", topicId: "earth-a2", difficulty: "hard", type: "single",
  question: "Which physical process is the PRIMARY driver of the geodynamo?",
  options: ["Tidal friction from the Moon", "Convection of molten iron in the outer core combined with Earth's rotation", "Solar wind pressure on the magnetosphere", "Precession of Earth's axis"],
  correctAnswer: 1,
  explanation: "The geodynamo is driven by thermal and compositional convection of electrically conducting liquid iron in the outer core, organized into spiraling columns by Earth's rotation (Coriolis effect). This self-exciting dynamo sustains the magnetic field.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q017", sectionId: "EARTH-01", topicId: "earth-a2", difficulty: "medium", type: "single",
  question: "The magnetic dipole axis of Earth is tilted from the geographic rotation axis by approximately:",
  options: ["0°", "~5°", "~11°", "~23.5°"],
  correctAnswer: 2,
  explanation: "Earth's magnetic dipole axis is offset from the rotation axis by about 11°. This is why the geomagnetic poles are not at the geographic poles.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-a3: Earth's Internal Structure & Discontinuities ──


{ id: "EARTH-01-Q018", sectionId: "EARTH-01", topicId: "earth-a3", difficulty: "easy", type: "single",
  question: "The boundary between the crust and the upper mantle is called the:",
  options: ["Gutenberg discontinuity", "Mohorovičić discontinuity", "Lehmann discontinuity", "Conrad discontinuity"],
  correctAnswer: 1,
  explanation: "The Mohorovičić discontinuity (Moho) is the boundary between Earth's crust and the upper mantle, first identified by Croatian seismologist Andrija Mohorovičić in 1909.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q019", sectionId: "EARTH-01", topicId: "earth-a3", difficulty: "medium", type: "single",
  question: "Which discontinuity marks the boundary between the mantle and the outer core?",
  options: ["Moho", "Gutenberg", "Lehmann", "Repetti"],
  correctAnswer: 1,
  explanation: "The Gutenberg discontinuity lies at about 2,890 km depth and separates the lower mantle from the outer core. S-waves disappear here because the outer core is liquid.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q020", sectionId: "EARTH-01", topicId: "earth-a3", difficulty: "medium", type: "single",
  question: "S-waves cannot pass through the outer core, providing evidence that the outer core is:",
  options: ["Solid", "Liquid", "Gas", "Plasma"],
  correctAnswer: 1,
  explanation: "S-waves (shear waves) cannot travel through liquids because liquids do not support shear stress. The disappearance of S-waves at ~2,890 km depth is direct evidence that the outer core is liquid.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q021", sectionId: "EARTH-01", topicId: "earth-a3", difficulty: "easy", type: "single",
  question: "Which is the deepest layer of Earth's interior?",
  options: ["Outer core", "Lower mantle", "Inner core", "Asthenosphere"],
  correctAnswer: 2,
  explanation: "The inner core is the deepest layer, extending from 5,150 km to Earth's centre at 6,371 km. Despite very high temperatures (~5,400 °C), it is solid because of extreme pressure.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q022", sectionId: "EARTH-01", topicId: "earth-a3", difficulty: "medium", type: "single",
  question: "The Lehmann discontinuity separates:",
  options: ["Crust and mantle", "Upper and lower mantle", "Outer core and inner core", "Mantle and outer core"],
  correctAnswer: 2,
  explanation: "The Lehmann discontinuity, at about 5,150 km depth, marks the boundary between the liquid outer core and the solid inner core, discovered by Danish seismologist Inge Lehmann in 1936.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q023", sectionId: "EARTH-01", topicId: "earth-a3", difficulty: "hard", type: "single",
  question: "The average density of Earth's outer core is closest to:",
  options: ["3.0 g/cm³", "5.5 g/cm³", "11 g/cm³", "13 g/cm³"],
  correctAnswer: 2,
  explanation: "The outer core has an average density of about 9.9–12.2 g/cm³ (≈11 g/cm³ typical), much higher than the mantle (~4.4–5.6 g/cm³), reflecting its iron–nickel composition.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q024", sectionId: "EARTH-01", topicId: "earth-a3", difficulty: "medium", type: "true_false",
  question: "P-waves can travel through both solids and liquids.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. P-waves (compressional/longitudinal waves) can travel through solids, liquids, and gases, which is why they reach seismographs on the opposite side of Earth even though S-waves do not.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q025", sectionId: "EARTH-01", topicId: "earth-a3", difficulty: "hard", type: "single",
  question: "Earth's S-wave shadow zone, where no direct S-waves arrive, lies between which angular distances from an earthquake's epicentre?",
  options: ["0°–30°", "30°–103°", "103°–180°", "180°–360°"],
  correctAnswer: 2,
  explanation: "Direct S-waves are absent between 103° and 180° from the epicentre because they cannot pass through the liquid outer core. This S-wave shadow zone is the key seismic evidence for a liquid outer core.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q026", sectionId: "EARTH-01", topicId: "earth-a3", difficulty: "hard", type: "single",
  question: "Arrange the following layers from Earth's surface inward: (i) Lower mantle, (ii) Inner core, (iii) Upper mantle, (iv) Outer core, (v) Crust",
  options: ["v → iii → i → iv → ii", "v → iii → i → ii → iv", "v → i → iii → iv → ii", "iii → v → i → iv → ii"],
  correctAnswer: 0,
  explanation: "From surface to centre: Crust (v, 0–70 km) → Upper mantle (iii, 70–670 km) → Lower mantle (i, 670–2,890 km) → Outer core (iv, 2,890–5,150 km) → Inner core (ii, 5,150–6,371 km).",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-a4: Lithosphere, Asthenosphere & Internal Heat ──


{ id: "EARTH-01-Q027", sectionId: "EARTH-01", topicId: "earth-a4", difficulty: "easy", type: "single",
  question: "The lithosphere is best described as:",
  options: ["Only the crust", "Only the upper mantle", "The crust plus the uppermost part of the mantle", "The lower mantle only"],
  correctAnswer: 2,
  explanation: "The lithosphere is the rigid outer shell of Earth, including the crust and the uppermost (rigid) part of the mantle. It is about 100 km thick on average.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q028", sectionId: "EARTH-01", topicId: "earth-a4", difficulty: "medium", type: "single",
  question: "The asthenosphere is best described as:",
  options: ["Rigid and brittle", "Plastic and capable of slow flow", "A liquid layer like the outer core", "Part of the crust"],
  correctAnswer: 1,
  explanation: "The asthenosphere is the plastic, partially molten upper-mantle layer that flows slowly over geological time. Tectonic plates 'ride' on top of it.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q029", sectionId: "EARTH-01", topicId: "earth-a4", difficulty: "medium", type: "single",
  question: "The average geothermal gradient in the upper crust is approximately:",
  options: ["1 °C/km", "10 °C/km", "25–30 °C/km", "100 °C/km"],
  correctAnswer: 2,
  explanation: "The average geothermal gradient in the upper crust is about 25–30 °C/km, meaning temperature rises by 25–30 °C for every kilometre of depth. The value varies locally with tectonic setting.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q030", sectionId: "EARTH-01", topicId: "earth-a4", difficulty: "hard", type: "single",
  question: "The primary source of Earth's internal heat today is:",
  options: ["Primordial heat from Earth's formation only", "Tidal friction from the Moon", "Radioactive decay of isotopes in the mantle and crust", "Solar radiation absorbed by the surface"],
  correctAnswer: 2,
  explanation: "Most of Earth's present-day internal heat comes from the radioactive decay of isotopes such as U-238, U-235, Th-232, and K-40. Primordial heat (from accretion and core formation) is a smaller, secondary contributor.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q031", sectionId: "EARTH-01", topicId: "earth-a4", difficulty: "medium", type: "true_false",
  question: "The lithosphere and the crust refer to exactly the same layer of Earth.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. The crust is the topmost compositional layer. The lithosphere is the rigid mechanical layer, which includes the crust PLUS the uppermost mantle. The lithosphere is therefore thicker than the crust.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q032", sectionId: "EARTH-01", topicId: "earth-a4", difficulty: "medium", type: "single",
  question: "Mantle convection is the primary driver of:",
  options: ["Earth's magnetic field", "Plate tectonics", "Ocean tides", "Earth's revolution around the Sun"],
  correctAnswer: 1,
  explanation: "Mantle convection — slow circulation of hot mantle material — is the primary driver of plate tectonics. (Convection in the outer core, not the mantle, drives the magnetic field.)",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q033", sectionId: "EARTH-01", topicId: "earth-a4", difficulty: "hard", type: "single",
  question: "The asthenosphere's ability to flow slowly is primarily due to:",
  options: ["High pressure alone", "A small percentage of partial melt (~1–5%) that allows mineral grains to slide past each other", "The presence of liquid water in pore spaces", "Tidal stresses from the Moon"],
  correctAnswer: 1,
  explanation: "A small fraction of partial melt (a few percent) coats mineral grains at asthenospheric depths, allowing them to slide past each other under stress and producing plastic flow over geological time. This is also why S-waves slow down in the asthenosphere (the 'low-velocity zone').",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q034", sectionId: "EARTH-01", topicId: "earth-a4", difficulty: "hard", type: "single",
  question: "At which location is the lithosphere thinnest?",
  options: ["Beneath ancient continental cratons", "At mid-ocean ridges", "Beneath young mountain belts like the Himalayas", "Beneath old ocean basins"],
  correctAnswer: 1,
  explanation: "The lithosphere is thinnest at mid-ocean ridges (~5 km) where hot asthenosphere rises close to the surface. It is thickest beneath ancient cratons (up to ~200 km).",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-a5: Gravity & Isostasy ──


{ id: "EARTH-01-Q035", sectionId: "EARTH-01", topicId: "earth-a5", difficulty: "easy", type: "single",
  question: "The average value of gravitational acceleration at Earth's surface is approximately:",
  options: ["9.8 m/s²", "6.67 m/s²", "12.5 m/s²", "1.6 m/s²"],
  correctAnswer: 0,
  explanation: "Standard surface gravity on Earth is about 9.8 m/s² (often given as 9.81 m/s²). The value 6.67 × 10⁻¹¹ is the gravitational constant G, not g.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q036", sectionId: "EARTH-01", topicId: "earth-a5", difficulty: "medium", type: "single",
  question: "On Earth's surface, gravity is strongest at the:",
  options: ["Equator", "Mid-latitudes", "Poles", "It is the same everywhere"],
  correctAnswer: 2,
  explanation: "Gravity is strongest at the poles because (1) the poles are closer to Earth's centre (no equatorial bulge to add distance) and (2) centrifugal force from rotation is zero at the poles.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q037", sectionId: "EARTH-01", topicId: "earth-a5", difficulty: "medium", type: "single",
  question: "Isostasy refers to:",
  options: ["The equal rate of Earth rotation at all latitudes", "The gravitational equilibrium of the crust floating on the mantle", "Equal solar radiation at both poles", "The constant density of Earth's interior"],
  correctAnswer: 1,
  explanation: "Isostasy is the principle that Earth's crust is in gravitational equilibrium on the denser, plastic mantle — thicker/less dense crust stands higher and has a deeper root, like an iceberg floating in water.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q038", sectionId: "EARTH-01", topicId: "earth-a5", difficulty: "hard", type: "single",
  question: "Scandinavia is currently rising by several millimetres per year. This is best explained as:",
  options: ["Tectonic uplift from mantle plumes", "Isostatic rebound after the melting of the last ice age ice sheet", "Sea level fall", "Sediment compaction"],
  correctAnswer: 1,
  explanation: "During the last ice age, a thick ice sheet depressed Scandinavia into the mantle. Since the ice melted (~10,000 years ago), the crust has been slowly rebounding upward — direct evidence for isostasy and the plastic nature of the asthenosphere.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q039", sectionId: "EARTH-01", topicId: "earth-a5", difficulty: "medium", type: "true_false",
  question: "In the Airy model of isostasy, mountains are supported by a thick crustal root extending into the mantle.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. The Airy model proposes uniform crustal density but variable thickness: tall mountain ranges have deep 'roots' penetrating into the denser mantle, like icebergs in water.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q040", sectionId: "EARTH-01", topicId: "earth-a5", difficulty: "hard", type: "single",
  question: "Which two models of isostasy differ in whether mountains are supported by thicker crust or by lower-density crust?",
  options: ["Airy and Pratt", "Wegener and Holmes", "Hutton and Lyell", "Darwin and Wallace"],
  correctAnswer: 0,
  explanation: "The Airy model uses uniform density with variable thickness (mountains have roots), while the Pratt model uses uniform thickness with variable density (mountains are made of lighter rock). Real Earth combines both effects.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q041", sectionId: "EARTH-01", topicId: "earth-a5", difficulty: "hard", type: "single",
  question: "The gravitational acceleration at the equator is approximately 9.78 m/s² and at the poles approximately 9.83 m/s². What is the main reason for this difference?",
  options: ["The Sun's gravity pulls more strongly at the equator", "Centrifugal acceleration from rotation reduces effective gravity at the equator; also, the equator is farther from Earth's centre", "The Earth is slightly denser at the poles", "Magnetic field strength varies with latitude"],
  correctAnswer: 1,
  explanation: "Two effects combine: (1) the centrifugal acceleration from rotation is maximum at the equator, partly offsetting gravity; (2) the equator is ~21 km farther from Earth's centre, weakening gravity by the inverse-square law. Together these lower equatorial g by about 0.5% relative to polar g.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-01-Q042", sectionId: "EARTH-01", topicId: "earth-a5", difficulty: "medium", type: "single",
  question: "A positive gravity anomaly over a region most likely indicates:",
  options: ["A body of lower-than-average density below the surface", "A body of higher-than-average density below the surface", "Lower-than-average elevation", "A region of thick sediment"],
  correctAnswer: 1,
  explanation: "A positive gravity anomaly means the measured gravity is higher than expected, typically due to a dense body below the surface (e.g., an ore deposit or basaltic intrusion). A negative anomaly would suggest a light body (e.g., a salt dome or void).",
  sourceCitation: "Standard Earth science curriculum" },






// ════════════════════════════════════════════════════════════════════
// EARTH-B: Minerals & Rocks
// ════════════════════════════════════════════════════════════════════


// ── Topic earth-b1: Minerals: Definition, Properties & Identification ──


{ id: "EARTH-02-Q001", sectionId: "EARTH-02", topicId: "earth-b1", difficulty: "easy", type: "single",
  question: "Which of the following is NOT a requirement for a substance to be classified as a mineral?",
  options: ["Naturally occurring", "Solid", "Organic in origin", "Crystalline structure"],
  correctAnswer: 2,
  explanation: "A mineral must be inorganic. Organic substances (e.g., coal, pearls) are not minerals, even if they have other mineral-like properties.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q002", sectionId: "EARTH-02", topicId: "earth-b1", difficulty: "medium", type: "single",
  question: "On the Mohs hardness scale, which mineral has a hardness of 7?",
  options: ["Calcite", "Feldspar", "Quartz", "Diamond"],
  correctAnswer: 2,
  explanation: "Quartz has a Mohs hardness of 7. Calcite is 3, feldspar (orthoclase) is 6, and diamond is 10.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q003", sectionId: "EARTH-02", topicId: "earth-b1", difficulty: "medium", type: "true_false",
  question: "Streak is generally a more reliable identification property than color.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Many minerals occur in multiple colors (e.g., quartz, fluorite), but their streak (the color of the powder) is usually constant. Hematite is dark grey but has a reddish-brown streak.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q004", sectionId: "EARTH-02", topicId: "earth-b1", difficulty: "easy", type: "single",
  question: "Which mineral effervesces (fizzes) vigorously when dilute hydrochloric acid is applied?",
  options: ["Quartz", "Gypsum", "Calcite", "Halite"],
  correctAnswer: 2,
  explanation: "Calcite (CaCO₃) reacts with dilute HCl to release CO₂, producing visible fizzing. This is the classic diagnostic test for calcite (and other carbonate minerals).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q005", sectionId: "EARTH-02", topicId: "earth-b1", difficulty: "hard", type: "single",
  question: "A mineral breaks along smooth, flat planes that meet at 60° and 120°. This is best described as:",
  options: ["Conchoidal fracture", "Cubic cleavage", "One perfect cleavage plane", "Two cleavages at ~60°/120° (amphibole-style)"],
  correctAnswer: 3,
  explanation: "Two cleavage planes intersecting at angles of about 60° and 120° is characteristic of amphibole (e.g., hornblende). Pyroxene has two cleavages at ~90°; mica has one perfect cleavage; galena has three at 90°; quartz has no cleavage.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q006", sectionId: "EARTH-02", topicId: "earth-b1", difficulty: "hard", type: "single",
  question: "Which of the following is NOT a mineral?",
  options: ["Quartz", "Diamond", "Opal", "Halite"],
  correctAnswer: 2,
  explanation: "Opal is not a true mineral because it lacks a crystalline structure — it is a mineraloid (amorphous SiO₂·nH₂O). Quartz, diamond, and halite all have ordered crystalline structures.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q007", sectionId: "EARTH-02", topicId: "earth-b1", difficulty: "medium", type: "single",
  question: "How many crystal systems are recognized in mineralogy?",
  options: ["5", "6", "7", "12"],
  correctAnswer: 2,
  explanation: "There are 7 crystal systems: cubic, tetragonal, orthorhombic, hexagonal, trigonal, monoclinic, and triclinic. They are defined by the lengths and angles of the crystallographic axes.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-b2: Common Rock-Forming Minerals ──


{ id: "EARTH-02-Q008", sectionId: "EARTH-02", topicId: "earth-b2", difficulty: "easy", type: "single",
  question: "Which mineral group is the MOST abundant in Earth's crust?",
  options: ["Quartz", "Feldspar", "Mica", "Calcite"],
  correctAnswer: 1,
  explanation: "Feldspar makes up about 60% of Earth's crust — by far the most abundant mineral group. Quartz is second at about 12%. This is a very common exam trap.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q009", sectionId: "EARTH-02", topicId: "earth-b2", difficulty: "medium", type: "single",
  question: "Silicate minerals make up approximately what percentage of Earth's crust?",
  options: ["~10%", "~30%", "~60%", "~90%"],
  correctAnswer: 3,
  explanation: "Silicate minerals (built on the SiO₄ tetrahedron) make up about 90% of Earth's crust. The remaining 10% are non-silicates (carbonates, oxides, sulfates, halides, etc.).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q010", sectionId: "EARTH-02", topicId: "earth-b2", difficulty: "medium", type: "single",
  question: "Which of the following minerals has NO cleavage and shows conchoidal fracture?",
  options: ["Mica", "Galena", "Quartz", "Calcite"],
  correctAnswer: 2,
  explanation: "Quartz has no cleavage because its Si–O framework has no planes of weakness. When broken, it produces conchoidal (curved, shell-like) fracture surfaces. Mica has one perfect cleavage; galena has three at 90°; calcite has three not at 90°.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q011", sectionId: "EARTH-02", topicId: "earth-b2", difficulty: "hard", type: "single",
  question: "Which mineral is identified by its salty taste and cubic crystal form?",
  options: ["Gypsum", "Halite", "Calcite", "Sulfite"],
  correctAnswer: 1,
  explanation: "Halite (NaCl, rock salt) tastes salty and crystallizes in the cubic system. Gypsum is salty-tasting only mildly and is very soft (Mohs 2); calcite reacts with HCl; 'sulfite' is not a standard rock-forming mineral.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q012", sectionId: "EARTH-02", topicId: "earth-b2", difficulty: "medium", type: "true_false",
  question: "Mica minerals have one perfect cleavage plane and split into thin, transparent sheets.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Both muscovite (transparent) and biotite (dark) have one perfect basal cleavage, allowing them to be peeled into thin sheets — a diagnostic property.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q013", sectionId: "EARTH-02", topicId: "earth-b2", difficulty: "hard", type: "single",
  question: "Which mineral weathers easily at the surface and is rarely found in sand or sedimentary rocks?",
  options: ["Quartz", "Feldspar", "Olivine", "Muscovite"],
  correctAnswer: 2,
  explanation: "Olivine ((Mg,Fe)₂SiO₄) weathers rapidly at Earth's surface because it forms at high temperatures and is unstable in the presence of water and oxygen. Quartz, by contrast, is highly resistant and concentrates in sands.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q014", sectionId: "EARTH-02", topicId: "earth-b2", difficulty: "medium", type: "single",
  question: "Which mineral has a hardness of 2 on the Mohs scale and can be scratched by a fingernail?",
  options: ["Calcite", "Gypsum", "Halite", "Talc"],
  correctAnswer: 1,
  explanation: "Gypsum has a Mohs hardness of 2 and can be scratched by a fingernail (hardness ~2.5). Talc is even softer (Mohs 1). Calcite is 3, halite is 2.5.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-b3: Igneous Rocks ──


{ id: "EARTH-02-Q015", sectionId: "EARTH-02", topicId: "earth-b3", difficulty: "easy", type: "single",
  question: "Igneous rocks with coarse-grained (phaneritic) texture formed by:",
  options: ["Rapid cooling at the surface", "Slow cooling at depth", "Contact metamorphism", "Lithification of sediment"],
  correctAnswer: 1,
  explanation: "Coarse-grained igneous rocks (e.g., granite) form when magma cools slowly deep underground, giving crystals time to grow to visible size. Rapid surface cooling produces fine-grained rocks (e.g., basalt).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q016", sectionId: "EARTH-02", topicId: "earth-b3", difficulty: "medium", type: "single",
  question: "Which of the following pairs correctly matches an intrusive igneous rock with its extrusive equivalent?",
  options: ["Granite — Rhyolite", "Basalt — Gabbro", "Gabbro — Granite", "Andesite — Diorite"],
  correctAnswer: 0,
  explanation: "Granite (intrusive, coarse) and rhyolite (extrusive, fine) share the same felsic composition — the correct intrusive–extrusive pair. Basalt pairs with gabbro (not the reverse order), andesite with diorite. Gabbro–granite mixes mafic intrusive with felsic intrusive and is not a pair.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q017", sectionId: "EARTH-02", topicId: "earth-b3", difficulty: "medium", type: "single",
  question: "A felsic igneous rock is generally characterized by:",
  options: ["High silica content, light color, viscous magma", "Low silica content, dark color, fluid magma", "High iron and magnesium, dark color", "No silica, glassy texture"],
  correctAnswer: 0,
  explanation: "Felsic igneous rocks have >65% SiO₂, are light-coloured (rich in quartz and feldspar), and their magmas are viscous — leading to explosive eruptions (e.g., rhyolite, granite).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q018", sectionId: "EARTH-02", topicId: "earth-b3", difficulty: "easy", type: "true_false",
  question: "Basalt is the most common volcanic rock on Earth.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Basalt makes up most of the oceanic crust and is the most common lava erupted at mid-ocean ridges and oceanic islands (e.g., Hawaii).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q019", sectionId: "EARTH-02", topicId: "earth-b3", difficulty: "hard", type: "single",
  question: "In Bowen's Reaction Series, which mineral crystallizes at the HIGHEST temperature (first)?",
  options: ["Quartz", "Olivine", "Muscovite", "K-feldspar"],
  correctAnswer: 1,
  explanation: "Olivine crystallizes first at the highest temperatures in the discontinuous branch of Bowen's series, followed by pyroxene → amphibole → biotite. Quartz and K-feldspar crystallize last at the lowest temperatures.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q020", sectionId: "EARTH-02", topicId: "earth-b3", difficulty: "medium", type: "single",
  question: "A volcanic rock full of small holes (vesicles) formed by gas bubbles is most likely:",
  options: ["Obsidian", "Pumice", "Basalt", "Granite"],
  correctAnswer: 1,
  explanation: "Pumice is a felsic volcanic rock with so many gas-bubble vesicles that it is often light enough to float on water. Obsidian is glassy (no holes); basalt is typically dense; granite is intrusive.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q021", sectionId: "EARTH-02", topicId: "earth-b3", difficulty: "hard", type: "single",
  question: "A rock contains large feldspar crystals embedded in a fine-grained dark matrix. This texture is called:",
  options: ["Glassy", "Vesicular", "Porphyritic", "Pyroclastic"],
  correctAnswer: 2,
  explanation: "Porphyritic texture forms when a magma begins to cool slowly at depth (growing large phenocrysts) and is then erupted and cooled quickly (forming a fine-grained groundmass). The two-stage cooling record is diagnostic.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-b4: Sedimentary Rocks ──


{ id: "EARTH-02-Q022", sectionId: "EARTH-02", topicId: "earth-b4", difficulty: "easy", type: "single",
  question: "The two main processes that turn loose sediment into sedimentary rock (lithification) are:",
  options: ["Cooling and crystallization", "Compaction and cementation", "Melting and recrystallization", "Heating and pressure"],
  correctAnswer: 1,
  explanation: "Lithification = compaction (weight of overlying sediment squeezes out water) + cementation (minerals precipitate between grains and bind them). Melting/cooling would produce igneous rocks, not sedimentary.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q023", sectionId: "EARTH-02", topicId: "earth-b4", difficulty: "medium", type: "single",
  question: "Which of the following is the MOST abundant sedimentary rock?",
  options: ["Sandstone", "Limestone", "Shale", "Conglomerate"],
  correctAnswer: 2,
  explanation: "Shale (made of clay-sized particles) accounts for about 50% of all sedimentary rocks by volume. Sandstone is second, followed by carbonate rocks.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q024", sectionId: "EARTH-02", topicId: "earth-b4", difficulty: "medium", type: "single",
  question: "A coarse-grained clastic rock with ROUNDED gravel-sized clasts is called:",
  options: ["Breccia", "Conglomerate", "Sandstone", "Shale"],
  correctAnswer: 1,
  explanation: "Conglomerate has rounded gravel-sized clasts (indicating long transport). Breccia is similar but has angular clasts (indicating little transport from source).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q025", sectionId: "EARTH-02", topicId: "earth-b4", difficulty: "easy", type: "true_false",
  question: "Fossils are most commonly found in sedimentary rocks.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Sedimentary rocks form at low temperatures and pressures that preserve organic remains. Igneous and metamorphic processes generally destroy fossils.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q026", sectionId: "EARTH-02", topicId: "earth-b4", difficulty: "medium", type: "single",
  question: "Coal is an example of which type of sedimentary rock?",
  options: ["Clastic", "Chemical", "Organic (biogenic)", "Pyroclastic"],
  correctAnswer: 2,
  explanation: "Coal forms from the accumulation and compaction of plant material (organic/biogenic sedimentary rock). Clastic rocks are made of broken fragments; chemical rocks precipitate from solution; pyroclastic rocks are volcanic (technically igneous).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q027", sectionId: "EARTH-02", topicId: "earth-b4", difficulty: "hard", type: "single",
  question: "A sandstone with well-sorted, well-rounded grains was most likely:",
  options: ["Deposited rapidly near the source", "Transported over a long distance or worked by persistent currents", "Formed by evaporation of seawater", "Crystallized from a melt"],
  correctAnswer: 1,
  explanation: "Well-sorted (uniform size) and well-rounded (no angular edges) grains indicate long transport or persistent reworking by wind, waves, or rivers. Poorly sorted, angular grains indicate rapid deposition near the source.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q028", sectionId: "EARTH-02", topicId: "earth-b4", difficulty: "hard", type: "single",
  question: "Evaporite rocks such as halite and gypsum form by:",
  options: ["Cooling of lava", "Precipitation from evaporating water bodies", "Metamorphism of limestone", "Accumulation of organic material"],
  correctAnswer: 1,
  explanation: "Evaporites precipitate when seawater or lake water evaporates in restricted basins, concentrating dissolved ions until they exceed saturation and crystallize. Halite (NaCl) and gypsum (CaSO₄·2H₂O) are the most common.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-b5: Metamorphic Rocks ──


{ id: "EARTH-02-Q029", sectionId: "EARTH-02", topicId: "earth-b5", difficulty: "easy", type: "single",
  question: "Metamorphism differs from melting in that during metamorphism:",
  options: ["The rock becomes magma", "The rock remains solid while minerals recrystallize", "All fossils are preserved", "Only chemical changes occur, not physical"],
  correctAnswer: 1,
  explanation: "Metamorphism is a SOLID-STATE process: the rock does not melt, but existing minerals recrystallize into new minerals stable at the new temperature and pressure. If the rock melts, it becomes magma and re-enters the igneous cycle.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q030", sectionId: "EARTH-02", topicId: "earth-b5", difficulty: "medium", type: "single",
  question: "Which metamorphic rock forms from limestone?",
  options: ["Quartzite", "Marble", "Slate", "Gneiss"],
  correctAnswer: 1,
  explanation: "Marble is the metamorphic product of limestone (or dolostone). Quartzite forms from quartz sandstone; slate from shale; gneiss can form from many protoliths including granite and shale.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q031", sectionId: "EARTH-02", topicId: "earth-b5", difficulty: "medium", type: "single",
  question: "Foliated metamorphic rocks (slate, schist, gneiss) are characterized by:",
  options: ["Random mineral orientation", "Parallel alignment of platy or elongated minerals", "Absence of any layering", "Glassy texture"],
  correctAnswer: 1,
  explanation: "Foliation is the parallel alignment of platy minerals (micas, chlorite) or banded segregation of light and dark minerals, produced by directed (differential) pressure during regional metamorphism.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q032", sectionId: "EARTH-02", topicId: "earth-b5", difficulty: "medium", type: "single",
  question: "Contact metamorphism is most closely associated with:",
  options: ["Mountain building at convergent margins", "Heat from nearby magma intrusions", "High pressure at subduction zones", "Burial in sedimentary basins"],
  correctAnswer: 1,
  explanation: "Contact (thermal) metamorphism occurs when country rock is heated by a nearby magma intrusion. Temperatures are high but pressures are relatively low, typically producing non-foliated rocks (e.g., hornfels, marble).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q033", sectionId: "EARTH-02", topicId: "earth-b5", difficulty: "hard", type: "single",
  question: "The correct order of increasing metamorphic grade (from low to high) for shale-derived rocks is:",
  options: ["Slate → Phyllite → Schist → Gneiss", "Gneiss → Schist → Phyllite → Slate", "Slate → Schist → Gneiss → Phyllite", "Phyllite → Slate → Schist → Gneiss"],
  correctAnswer: 0,
  explanation: "As metamorphic grade increases, foliation becomes more pronounced: slate (slaty cleavage) → phyllite (silky sheen, fine mica) → schist (visible mica flakes) → gneiss (alternating light and dark bands).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q034", sectionId: "EARTH-02", topicId: "earth-b5", difficulty: "hard", type: "true_false",
  question: "Marble is a foliated metamorphic rock.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. Marble is NON-foliated because it forms from limestone, whose parent mineral (calcite) does not produce platy minerals, and the pressure is typically uniform. Quartzite (from sandstone) and hornfels are also non-foliated.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q035", sectionId: "EARTH-02", topicId: "earth-b5", difficulty: "hard", type: "single",
  question: "Which index mineral indicates the HIGHEST metamorphic grade in regional metamorphism?",
  options: ["Chlorite", "Biotite", "Garnet", "Sillimanite"],
  correctAnswer: 3,
  explanation: "The standard index mineral sequence for regional metamorphism (low to high grade) is: chlorite → biotite → garnet → staurolite → kyanite → sillimanite. Sillimanite indicates the highest grade, forming at high temperature and pressure.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-b6: The Rock Cycle ──


{ id: "EARTH-02-Q036", sectionId: "EARTH-02", topicId: "earth-b6", difficulty: "easy", type: "single",
  question: "The rock cycle is best described as:",
  options: ["A linear sequence from igneous to sedimentary to metamorphic", "A network in which any rock can be transformed into any other rock", "A one-way path that ends with metamorphic rocks", "An event that has occurred only once in Earth's history"],
  correctAnswer: 1,
  explanation: "The rock cycle is a network, not a line. Any rock type can be transformed into any other type given the right conditions (melting, weathering, metamorphism). It has no fixed starting point.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q037", sectionId: "EARTH-02", topicId: "earth-b6", difficulty: "medium", type: "single",
  question: "The primary energy sources driving the rock cycle are:",
  options: ["The Sun only", "Earth's internal heat only", "Earth's internal heat and solar energy + gravity", "Tidal forces from the Moon"],
  correctAnswer: 2,
  explanation: "Earth's internal heat drives melting (igneous), metamorphism, and plate tectonics. Solar energy + gravity drive weathering, erosion, transport, and deposition at the surface. Both are needed for the full cycle.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q038", sectionId: "EARTH-02", topicId: "earth-b6", difficulty: "medium", type: "single",
  question: "Igneous rocks exposed at the surface are most likely to next become:",
  options: ["Metamorphic rocks", "Sediments → sedimentary rocks", "Magma", "Meteorites"],
  correctAnswer: 1,
  explanation: "When igneous rocks are exposed at the surface, they undergo weathering and erosion, producing sediments that are transported and eventually lithified into sedimentary rocks — the most common next step in the cycle.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q039", sectionId: "EARTH-02", topicId: "earth-b6", difficulty: "hard", type: "single",
  question: "Which statement BEST describes the relationship between plate tectonics and the rock cycle?",
  options: ["They are completely independent processes", "Plate tectonics provides the energy and setting for most rock cycle transformations", "The rock cycle drives plate tectonics", "Plate tectonics only affects igneous rocks"],
  correctAnswer: 1,
  explanation: "Plate tectonics provides the energy and tectonic settings for most rock cycle processes: mid-ocean ridges create basalt; subduction zones create metamorphism, melting, and volcanoes; collisions create regional metamorphism; uplift exposes rocks to weathering.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q040", sectionId: "EARTH-02", topicId: "earth-b6", difficulty: "hard", type: "single",
  question: "Which of the following transformations is NOT part of the rock cycle?",
  options: ["Granite weathering to sand, then forming sandstone", "Shale metamorphosing to slate, then schist, then gneiss", "Basalt melting at a subduction zone and rising as granite magma", "Cooling lava to form obsidian, then dissolving completely in the ocean (no trace remains)"],
  correctAnswer: 3,
  explanation: "All other options are real parts of the rock cycle. While obsidian can dissolve chemically, the option describes a complete disappearance with no residue — which would not occur; weathered material is always incorporated into new sediments.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-02-Q041", sectionId: "EARTH-02", topicId: "earth-b6", difficulty: "medium", type: "true_false",
  question: "Igneous rocks make up the largest volume of Earth's crust, but sedimentary rocks cover the largest area of the continental surface.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Igneous rocks (especially basalt) dominate the oceanic crust and make up ~95% of the crust by volume, but continental surfaces are largely covered by a thin veneer of sedimentary rocks (~75% by area).",
  sourceCitation: "Standard Earth science curriculum" },






// ════════════════════════════════════════════════════════════════════
// EARTH-C: Geological Time & Fossils
// ════════════════════════════════════════════════════════════════════


// ── Topic earth-c1: Relative Dating & Stratigraphic Principles ──


{ id: "EARTH-03-Q001", sectionId: "EARTH-03", topicId: "earth-c1", difficulty: "easy", type: "single",
  question: "According to the Law of Superposition, in an undisturbed sedimentary sequence:",
  options: ["The oldest layer is at the top", "The oldest layer is at the bottom", "All layers are the same age", "The youngest layer is in the middle"],
  correctAnswer: 1,
  explanation: "In any undisturbed sequence, sediment is deposited on top of older layers. So the bottom layer is the oldest and the top is the youngest. This assumes no folding, faulting, or overturning.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q002", sectionId: "EARTH-03", topicId: "earth-c1", difficulty: "medium", type: "single",
  question: "A granite intrusion cuts across a sequence of sedimentary rocks. According to the Principle of Cross-Cutting Relationships, the granite is:",
  options: ["Older than the sedimentary rocks", "Younger than the sedimentary rocks", "The same age as the sedimentary rocks", "Impossible to date by this principle"],
  correctAnswer: 1,
  explanation: "A feature that cuts across another must be younger than what it cuts. The sedimentary rocks had to be there first in order for the granite to cut through them.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q003", sectionId: "EARTH-03", topicId: "earth-c1", difficulty: "medium", type: "true_false",
  question: "A granite clast (boulder) embedded in a sandstone indicates that the granite is YOUNGER than the sandstone.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. According to the Principle of Inclusions, the included fragment is OLDER than the host rock. The granite must have already existed and been eroded to produce a clast that was then incorporated into the still-soft sandstone.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q004", sectionId: "EARTH-03", topicId: "earth-c1", difficulty: "medium", type: "single",
  question: "An angular unconformity is best described as:",
  options: ["A surface between parallel sedimentary beds of different ages", "An erosional surface where tilted or folded rocks lie below horizontal rocks", "A surface within a single rock layer", "A fracture along which rocks have moved"],
  correctAnswer: 1,
  explanation: "An angular unconformity forms when older rocks are tilted or folded, then eroded flat, and finally overlain by new horizontal layers. The 'angular' refers to the discordance between the tilted beds below and the horizontal beds above.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q005", sectionId: "EARTH-03", topicId: "earth-c1", difficulty: "hard", type: "single",
  question: "An unconformity represents:",
  options: ["A depositional layer", "A surface representing missing time (non-deposition or erosion)", "A volcanic intrusion", "A type of mineral"],
  correctAnswer: 1,
  explanation: "An unconformity is a surface that represents a gap in the geological record — a period during which either no sediment was deposited or previously deposited sediment was eroded away. Such gaps can represent millions or billions of years.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q006", sectionId: "EARTH-03", topicId: "earth-c1", difficulty: "hard", type: "single",
  question: "Which principle states that sedimentary layers are originally deposited as horizontal sheets?",
  options: ["Superposition", "Original horizontality", "Lateral continuity", "Faunal succession"],
  correctAnswer: 1,
  explanation: "The Principle of Original Horizontality (Steno, 1669) states that sediments settle under gravity in horizontal layers. Therefore, any tilted or folded sedimentary layer must have been deformed after deposition.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q007", sectionId: "EARTH-03", topicId: "earth-c1", difficulty: "hard", type: "single",
  question: "Which relative-dating principle is the foundation of biostratigraphy and intercontinental fossil correlation?",
  options: ["Superposition", "Lateral continuity", "Faunal succession", "Cross-cutting relationships"],
  correctAnswer: 2,
  explanation: "The Principle of Faunal Succession (Smith, 1790s) states that fossil organisms appear and disappear in a definite, recognisable order through time. The same fossil assemblage always indicates the same age, allowing correlation of rocks across continents.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-c2: Absolute Dating & Radiometric Methods ──


{ id: "EARTH-03-Q008", sectionId: "EARTH-03", topicId: "earth-c2", difficulty: "easy", type: "single",
  question: "What is the half-life of a radioactive isotope?",
  options: ["The time for all parent atoms to decay", "The time for half of the parent atoms to decay to daughter atoms", "The age of the sample", "The ratio of parent to daughter atoms"],
  correctAnswer: 1,
  explanation: "The half-life is the time required for half of the parent atoms in a sample to decay to daughter atoms. After two half-lives, only 25% of the original parent remains; after three, 12.5%; and so on.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q009", sectionId: "EARTH-03", topicId: "earth-c2", difficulty: "easy", type: "single",
  question: "Which radiometric method is most suitable for dating organic material less than ~50,000 years old?",
  options: ["Uranium–Lead (U-Pb)", "Potassium–Argon (K-Ar)", "Carbon-14 (radiocarbon)", "Rubidium–Strontium (Rb-Sr)"],
  correctAnswer: 2,
  explanation: "Carbon-14 has a half-life of only 5,730 years, making it suitable for dating organic material up to about 10 half-lives (~50,000–60,000 years). For older materials, longer-half-life methods are needed.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q010", sectionId: "EARTH-03", topicId: "earth-c2", difficulty: "medium", type: "single",
  question: "A sample contains 12.5% of its original Carbon-14. The half-life of C-14 is 5,730 years. What is the age of the sample?",
  options: ["5,730 years", "11,460 years", "17,190 years", "22,920 years"],
  correctAnswer: 2,
  explanation: "100% → 50% (1 half-life) → 25% (2 half-lives) → 12.5% (3 half-lives). Age = 3 × 5,730 = 17,190 years.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q011", sectionId: "EARTH-03", topicId: "earth-c2", difficulty: "medium", type: "single",
  question: "Zircon crystals are widely used in U-Pb dating because:",
  options: ["They contain no uranium at all", "They accept uranium but reject lead when they crystallize, so any lead measured is from decay", "They are very soft and easy to dissolve", "They form only in sedimentary rocks"],
  correctAnswer: 1,
  explanation: "Zircon (ZrSiO₄) readily incorporates uranium into its crystal structure but strongly excludes lead. The moment a zircon crystallizes, its U-Pb clock is set to zero — all lead measured later is from radioactive decay of U.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q012", sectionId: "EARTH-03", topicId: "earth-c2", difficulty: "hard", type: "single",
  question: "The half-life of a radioactive isotope depends on:",
  options: ["Temperature and pressure of the sample", "Chemical state of the parent element", "The specific isotope — it is a fundamental nuclear property", "The age of the sample"],
  correctAnswer: 2,
  explanation: "Half-life is a fundamental nuclear property of each isotope and is independent of temperature, pressure, chemical state, or age. This is precisely what makes radiometric dating reliable.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q013", sectionId: "EARTH-03", topicId: "earth-c2", difficulty: "medium", type: "true_false",
  question: "Sedimentary rocks can usually be dated directly by radiometric methods.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. Sedimentary rocks contain mineral grains that are older than the rock itself (eroded from older source rocks). The standard approach is to date volcanic layers (ash beds, lava flows) interbedded with the sedimentary sequence and bracket the age of the sedimentary rocks between them.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q014", sectionId: "EARTH-03", topicId: "earth-c2", difficulty: "hard", type: "single",
  question: "For a radiometric date to be valid, the mineral or rock must have been:",
  options: ["Cooled very slowly", "A closed system since the rock formed (no loss or gain of parent or daughter atoms)", "Submerged in water", "Subjected to high pressure"],
  correctAnswer: 1,
  explanation: "The closed-system assumption requires that neither parent nor daughter atoms have been added or removed since the rock formed. Loss of daughter (e.g., argon escape in K-Ar) makes the rock appear younger; gain of daughter makes it appear older.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q015", sectionId: "EARTH-03", topicId: "earth-c2", difficulty: "hard", type: "single",
  question: "Which method is most appropriate for dating a 3-billion-year-old granite?",
  options: ["Carbon-14 (half-life 5,730 yr)", "Uranium–Lead (U-Pb, half-life 4.47 billion yr)", "Carbon-14 is fine, but takes more sample", "Tritium (H-3)"],
  correctAnswer: 1,
  explanation: "A 3-billion-year-old granite is far beyond the range of C-14. U-Pb (and its sister U-235 decay) is the standard for very old rocks because its long half-life (4.47 Ga) matches that time scale, and zircon is the workhorse mineral.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-c3: The Geological Time Scale & Fossils ──


{ id: "EARTH-03-Q016", sectionId: "EARTH-03", topicId: "earth-c3", difficulty: "easy", type: "single",
  question: "The approximate age of Earth is:",
  options: ["4.6 thousand years", "4.6 million years", "4.6 billion years", "13.8 billion years"],
  correctAnswer: 2,
  explanation: "Earth formed approximately 4.6 billion years ago (4,600 Ma). This is determined by radiometric dating of the oldest meteorites and Earth minerals (e.g., zircons from Jack Hills, Australia, are ~4.4 billion years old).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q017", sectionId: "EARTH-03", topicId: "earth-c3", difficulty: "medium", type: "single",
  question: "Which eon of geological time covers the last 541 million years and contains nearly all fossil evidence of abundant, complex life?",
  options: ["Hadean", "Archean", "Proterozoic", "Phanerozoic"],
  correctAnswer: 3,
  explanation: "The Phanerozoic eon (Greek: 'visible life') began 541 million years ago. It contains nearly all the fossil record of complex life — fish, land plants, reptiles, mammals, etc. The earlier three eons together cover ~88% of Earth history but have very sparse fossils.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q018", sectionId: "EARTH-03", topicId: "earth-c3", difficulty: "medium", type: "single",
  question: "Which era is known as the 'Age of Dinosaurs'?",
  options: ["Paleozoic", "Mesozoic", "Cenozoic", "Proterozoic"],
  correctAnswer: 1,
  explanation: "The Mesozoic era (252–66 million years ago) is called the 'Age of Dinosaurs'. It includes the Triassic, Jurassic, and Cretaceous periods, and ended with the K-Pg mass extinction that wiped out non-avian dinosaurs.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q019", sectionId: "EARTH-03", topicId: "earth-c3", difficulty: "medium", type: "single",
  question: "An index fossil is best described as:",
  options: ["A fossil of any large organism", "A fossil of a widespread, short-lived species useful for dating and correlation", "The very first fossil of a species ever found", "A fossil preserved in igneous rock"],
  correctAnswer: 1,
  explanation: "An index fossil must be widespread geographically, abundant, easy to identify, and have existed for a SHORT geological time. Ammonites, trilobites, and foraminifera are classic examples.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q020", sectionId: "EARTH-03", topicId: "earth-c3", difficulty: "hard", type: "single",
  question: "Which mass extinction was the LARGEST in Earth's history, eliminating an estimated 90–96% of marine species?",
  options: ["End-Cretaceous (K-Pg, 66 Ma)", "End-Permian (~252 Ma)", "End-Ordovician (~445 Ma)", "Late Devonian (~375 Ma)"],
  correctAnswer: 1,
  explanation: "The end-Permian extinction (also called the 'Great Dying') was the largest in Earth's history, eliminating an estimated 90–96% of marine species and 70% of terrestrial vertebrate species. It was likely caused by massive Siberian Trap volcanism, ocean acidification, and anoxia.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q021", sectionId: "EARTH-03", topicId: "earth-c3", difficulty: "hard", type: "single",
  question: "The fossilization of an insect in tree resin is an example of preservation by:",
  options: ["Permineralization", "Carbonization", "Amber entombment", "Mold formation"],
  correctAnswer: 2,
  explanation: "Insects trapped in tree resin can be preserved in amber, sometimes with extraordinary detail. The resin hardens over time and the original organism can survive for millions of years. Carbonization produces thin films (e.g., graptolites); permineralization fills pore space with minerals (e.g., petrified wood).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q022", sectionId: "EARTH-03", topicId: "earth-c3", difficulty: "medium", type: "true_false",
  question: "Fossils of corals in a limestone indicate that the area was once a warm, shallow tropical sea.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Modern reef-building corals live only in warm (typically >20 °C), shallow (typically <50 m), sunlit tropical seas. Finding coral fossils in a limestone is a strong environmental indicator of past tropical marine conditions.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-03-Q023", sectionId: "EARTH-03", topicId: "earth-c3", difficulty: "hard", type: "single",
  question: "Arrange the Phanerozoic eras from oldest to youngest: (i) Cenozoic, (ii) Mesozoic, (iii) Paleozoic",
  options: ["(i) → (ii) → (iii)", "(ii) → (iii) → (i)", "(iii) → (ii) → (i)", "(i) → (iii) → (ii)"],
  correctAnswer: 2,
  explanation: "From oldest to youngest: Paleozoic (iii, 541–252 Ma) → Mesozoic (ii, 252–66 Ma) → Cenozoic (i, 66 Ma–present). The boundaries are marked by the end-Permian and end-Cretaceous mass extinctions.",
  sourceCitation: "Standard Earth science curriculum" },






// ════════════════════════════════════════════════════════════════════
// EARTH-D: Plate Tectonics
// ════════════════════════════════════════════════════════════════════


// ── Topic earth-d1: Continental Drift (Wegener, 1912) ──


{ id: "EARTH-04-Q001", sectionId: "EARTH-04", topicId: "earth-d1", difficulty: "easy", type: "single",
  question: "Who first proposed the hypothesis of continental drift in 1912?",
  options: ["Harry Hess", "Alfred Wegener", "J. Tuzo Wilson", "Fred Vine"],
  correctAnswer: 1,
  explanation: "Alfred Wegener, a German meteorologist and geophysicist, formally proposed continental drift in 1912. He compiled multiple lines of evidence but the mechanism he proposed was wrong, and the idea was not widely accepted until the plate tectonic revolution of the 1960s.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q002", sectionId: "EARTH-04", topicId: "earth-d1", difficulty: "medium", type: "single",
  question: "Which fossil was used by Wegener as evidence that South America and Africa were once joined?",
  options: ["Trilobite", "Ammonite", "Mesosaurus", "T. rex"],
  correctAnswer: 2,
  explanation: "Mesosaurus was a small freshwater (and possibly brackish) reptile whose fossils are found in both Brazil and South Africa. It could not have crossed the Atlantic Ocean, so its distribution was a key piece of evidence for a former land connection.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q003", sectionId: "EARTH-04", topicId: "earth-d1", difficulty: "medium", type: "single",
  question: "Pangaea began to break apart approximately:",
  options: ["~4.6 billion years ago", "~540 million years ago", "~200 million years ago", "~10,000 years ago"],
  correctAnswer: 2,
  explanation: "Pangaea began breaking apart in the Mesozoic, ~200 million years ago. The Atlantic Ocean started opening ~180 Ma as North America rifted from Africa, and continues to widen today at a few cm per year.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q004", sectionId: "EARTH-04", topicId: "earth-d1", difficulty: "medium", type: "true_false",
  question: "Wegener correctly proposed the mechanism by which continents drift.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. Wegener's evidence for continental drift was strong, but his proposed mechanism — that continents plowed through oceanic crust driven by centrifugal and tidal forces — was physically impossible and is the main reason his ideas were rejected in his lifetime. The correct mechanism (plate tectonics with slab pull, ridge push, and mantle convection) was only worked out in the 1960s.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q005", sectionId: "EARTH-04", topicId: "earth-d1", difficulty: "hard", type: "single",
  question: "Glacial deposits of the same Permo-Carboniferous age are found in South America, Africa, India, Australia, and Antarctica. This is best explained by:",
  options: ["A global ice age covering all continents", "These continents having been joined together near the South Pole", "Meteoric ice falling uniformly worldwide", "The deposits being formed independently at each location"],
  correctAnswer: 1,
  explanation: "The same-age glacial deposits across now-separated southern continents is a classic piece of evidence for continental drift. The deposits are interpreted as a single large ice sheet that once covered the joined Gondwana supercontinent when it was positioned near the South Pole. Once the continents drifted apart, the deposits were carried with them to their present locations.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q006", sectionId: "EARTH-04", topicId: "earth-d1", difficulty: "hard", type: "single",
  question: "Which present-day mountain belt was once continuous with the Appalachian Mountains but was split apart by the opening of the Atlantic Ocean?",
  options: ["Andes", "Rockies", "Caledonian Mountains (Scotland/Scandinavia)", "Alps"],
  correctAnswer: 2,
  explanation: "The Appalachian Mountains of eastern North America and the Caledonian Mountains of Scotland and Scandinavia were once a continuous mountain belt formed during the closing of the Iapetus Ocean in the early Paleozoic. When the Atlantic opened ~180 Ma, the mountain belt was split, with the Caledonides on one side and the Appalachians on the other.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-d2: Plate Tectonic Theory ──


{ id: "EARTH-04-Q007", sectionId: "EARTH-04", topicId: "earth-d2", difficulty: "easy", type: "single",
  question: "Plate tectonics is the modern theory that Earth's lithosphere is divided into:",
  options: ["Two large plates", "Five major continents", "About 15 major plates and many smaller ones", "Continents and ocean basins only"],
  correctAnswer: 2,
  explanation: "Earth's lithosphere is broken into about 15 major plates (Pacific, North American, Eurasian, African, South American, Indo-Australian, Antarctic, Nazca, Cocos, etc.) plus many smaller ones. The plates carry both continents and ocean basins, not just continents.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q008", sectionId: "EARTH-04", topicId: "earth-d2", difficulty: "medium", type: "single",
  question: "Which of the following is generally considered the STRONGEST driving force of plate motion?",
  options: ["Ridge push", "Slab pull", "Tidal forces", "Earth's rotation"],
  correctAnswer: 1,
  explanation: "Slab pull — the gravitational sinking of a cold, dense subducting slab, which pulls the rest of the plate along — is generally considered the strongest driving force. Plates attached to large subducting slabs (e.g., Pacific, Nazca) tend to move fastest.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q009", sectionId: "EARTH-04", topicId: "earth-d2", difficulty: "medium", type: "single",
  question: "Typical plate speeds are on the order of:",
  options: ["Millimetres per year", "Centimetres to ~15 cm per year", "Metres per year", "Kilometres per year"],
  correctAnswer: 1,
  explanation: "Plates move at typical rates of 1–15 cm per year — about as fast as human fingernail growth. The fastest plates (Pacific, Nazca, Cocos) move at the upper end of this range.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q010", sectionId: "EARTH-04", topicId: "earth-d2", difficulty: "medium", type: "true_false",
  question: "The plate tectonic 'revolution' of the 1960s was triggered by the discovery of seafloor spreading and magnetic stripes on the ocean floor.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Harry Hess proposed seafloor spreading in 1960, and Fred Vine and Drummond Matthews showed in 1963 that magnetic stripes symmetric about mid-ocean ridges record reversals of Earth's field. Together with global earthquake patterns, this converted most geologists to plate tectonics by the late 1960s.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q011", sectionId: "EARTH-04", topicId: "earth-d2", difficulty: "hard", type: "single",
  question: "Which of the following observations does NOT fit the plate tectonic theory?",
  options: ["Magnetic stripes symmetric about mid-ocean ridges", "Earthquakes concentrated along narrow bands (plate boundaries)", "Identical age for all ocean floor rocks worldwide", "The progressive increase in seafloor age away from ridges"],
  correctAnswer: 2,
  explanation: "All ocean floor rocks are NOT the same age. Seafloor age is youngest at mid-ocean ridges and progressively older away from the ridge, up to about 200 million years — beyond which no oceanic crust survives (it has all been subducted). This is a key prediction of plate tectonics.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q012", sectionId: "EARTH-04", topicId: "earth-d2", difficulty: "hard", type: "single",
  question: "Hotspots such as Hawaii are believed to be produced by:",
  options: ["Subduction at convergent plate boundaries", "Narrow plumes of hot mantle rising from deep within the Earth", "Transform faulting", "Spreading at mid-ocean ridges"],
  correctAnswer: 1,
  explanation: "Hotspots are thought to be narrow plumes of hot mantle rising from deep within the Earth, possibly from the core-mantle boundary. Because they are anchored deep in the mantle, they stay roughly fixed while the plate above moves, producing chains of progressively older volcanoes.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q013", sectionId: "EARTH-04", topicId: "earth-d2", difficulty: "hard", type: "single",
  question: "The Hawaiian–Emperor seamount chain shows a distinct bend at about 50 million years ago. This bend records:",
  options: ["A change in the location of the Hawaiian hotspot", "A major change in direction of the Pacific Plate", "The opening of a new ocean basin", "A meteorite impact"],
  correctAnswer: 1,
  explanation: "The Hawaiian hotspot is thought to have remained roughly fixed deep in the mantle. The bend in the chain therefore records a major change in the direction of Pacific Plate motion about 50 million years ago, from roughly north-northwest to west-northwest.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-d3: Plate Boundaries ──


{ id: "EARTH-04-Q014", sectionId: "EARTH-04", topicId: "earth-d3", difficulty: "easy", type: "single",
  question: "Which type of plate boundary is associated with the creation of new oceanic crust?",
  options: ["Divergent", "Convergent", "Transform", "All of the above"],
  correctAnswer: 0,
  explanation: "Divergent plate boundaries (e.g., mid-ocean ridges) are where two plates move APART and new oceanic crust is created by upwelling magma. Convergent boundaries destroy crust; transform boundaries conserve it.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q015", sectionId: "EARTH-04", topicId: "earth-d3", difficulty: "medium", type: "single",
  question: "The Andes Mountains were formed primarily by:",
  options: ["Ocean–continent convergence (Nazca Plate subducting beneath South America)", "Continent–continent collision", "Transform faulting", "A continental rift"],
  correctAnswer: 0,
  explanation: "The Andes formed by the subduction of the oceanic Nazca Plate beneath the continental South American Plate. The resulting compression, volcanic arc, and crustal thickening produced the longest mountain chain on Earth.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q016", sectionId: "EARTH-04", topicId: "earth-d3", difficulty: "medium", type: "single",
  question: "The Himalayas were formed primarily by:",
  options: ["Ocean–continent subduction", "Continent–continent collision between India and Eurasia", "Transform faulting", "A hotspot"],
  correctAnswer: 1,
  explanation: "The Himalayas formed by the ongoing collision of the Indian Plate with the Eurasian Plate, which began ~50 million years ago. Both plates carry buoyant continental crust, so neither subducts — instead, the crust is shortened and thickened into the highest mountains on Earth.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q017", sectionId: "EARTH-04", topicId: "earth-d3", difficulty: "medium", type: "true_false",
  question: "Deep-focus earthquakes (>300 km) occur only at subduction zones.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Deep earthquakes occur within cold, brittle subducting slabs before they warm up enough to deform plastically. The distribution of these deep quakes defines the Wadati–Benioff zone, a dipping plane of seismicity that traces the subducting slab down to about 700 km depth.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q018", sectionId: "EARTH-04", topicId: "earth-d3", difficulty: "medium", type: "single",
  question: "A volcanic island arc (e.g., Japan, Aleutians) is formed at which type of plate boundary?",
  options: ["Ocean–ocean convergence", "Ocean–continent convergence", "Continent–continent collision", "Transform"],
  correctAnswer: 0,
  explanation: "When two oceanic plates converge, the older, denser one subducts beneath the other, releasing water that triggers melting in the overlying mantle wedge. The resulting magma rises to form a chain of volcanic islands on the overriding plate — a volcanic island arc.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q019", sectionId: "EARTH-04", topicId: "earth-d3", difficulty: "hard", type: "single",
  question: "The San Andreas Fault in California is a classic example of:",
  options: ["A divergent plate boundary", "A convergent plate boundary", "A transform plate boundary", "A subduction zone"],
  correctAnswer: 2,
  explanation: "The San Andreas Fault is a transform plate boundary where the Pacific Plate slides northwest past the North American Plate. Earthquakes are common and shallow, but there is no significant volcanism along the fault itself.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q020", sectionId: "EARTH-04", topicId: "earth-d3", difficulty: "hard", type: "single",
  question: "Continent–continent collisions (e.g., India–Eurasia) generally produce:",
  options: ["Major volcanic arcs", "Deep oceanic trenches", "Fold mountains with relatively little volcanism", "Wide rift valleys"],
  correctAnswer: 2,
  explanation: "When two continental plates collide, both are too buoyant to subduct deeply. The crust is shortened and thickened instead, producing high fold mountains (Himalayas, Alps) with thrust faults and crustal stacking. There is little or no volcanism because no slab is sinking into the mantle to release water and trigger melting.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q021", sectionId: "EARTH-04", topicId: "earth-d3", difficulty: "hard", type: "single",
  question: "Earthquakes along mid-ocean ridges are typically:",
  options: ["Shallow (<70 km)", "Intermediate (70–300 km)", "Deep (300–700 km)", "Mix of all depths"],
  correctAnswer: 0,
  explanation: "Mid-ocean ridges are divergent plate boundaries underlain by thin, hot lithosphere. Earthquakes are confined to the thin brittle layer, so they are all shallow (<70 km). Deep earthquakes only occur in cold subducting slabs.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q022", sectionId: "EARTH-04", topicId: "earth-d3", difficulty: "hard", type: "single",
  question: "At an ocean–continent convergent boundary, volcanic activity occurs:",
  options: ["On the subducting oceanic plate", "On the overriding continental plate, forming a volcanic mountain range", "In the deep-sea trench", "Only in the back-arc basin"],
  correctAnswer: 1,
  explanation: "The subducting oceanic plate releases water as it descends, which triggers flux melting in the overlying mantle wedge. The resulting magma rises through the continental plate and erupts as a volcanic arc on the continent (e.g., the Andes along the western margin of South America).",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-d4: Tectonic Consequences & Hotspots ──


{ id: "EARTH-04-Q023", sectionId: "EARTH-04", topicId: "earth-d4", difficulty: "medium", type: "single",
  question: "The Wilson cycle describes:",
  options: ["The daily rotation of Earth", "The repeated opening and closing of ocean basins over hundreds of millions of years", "The 26,000-year precession cycle", "The 11-year sunspot cycle"],
  correctAnswer: 1,
  explanation: "J. Tuzo Wilson (1960s) recognized that oceans open, close, and re-open many times through Earth history. The Wilson cycle includes continental rifting, ocean opening, subduction, and continent–continent collision. The Appalachian–Caledonide mountain belt is the eroded remnant of an earlier Wilson cycle.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q024", sectionId: "EARTH-04", topicId: "earth-d4", difficulty: "medium", type: "single",
  question: "Which of the following best illustrates an early stage of the Wilson cycle?",
  options: ["The Himalayas", "The East African Rift", "The Mid-Atlantic Ridge", "The San Andreas Fault"],
  correctAnswer: 1,
  explanation: "The East African Rift is an active continental rift where the African Plate is splitting apart. This is the early stage of the Wilson cycle; if rifting continues, a new ocean (like the Red Sea or eventually the Atlantic) will form.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q025", sectionId: "EARTH-04", topicId: "earth-d4", difficulty: "easy", type: "true_false",
  question: "Hotspots such as Hawaii are located at plate boundaries.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. Hotspots are intraplate features — they occur in the middle of plates, not at plate boundaries. Hawaii is in the middle of the Pacific Plate; Yellowstone is in the middle of the North American Plate.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q026", sectionId: "EARTH-04", topicId: "earth-d4", difficulty: "hard", type: "single",
  question: "Which of the following does NOT result primarily from plate tectonic processes?",
  options: ["The Andes", "The Himalayas", "The Hawaiian Islands", "The Mid-Atlantic Ridge"],
  correctAnswer: 2,
  explanation: "The Hawaiian Islands are formed by a hotspot — an intraplate mantle plume — not by a plate boundary process. The Andes are produced by subduction; the Himalayas by continental collision; the Mid-Atlantic Ridge by seafloor spreading.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q027", sectionId: "EARTH-04", topicId: "earth-d4", difficulty: "hard", type: "single",
  question: "A chain of progressively older volcanic islands/seamounts, all aligned in the direction of past plate motion, is most likely:",
  options: ["A volcanic island arc above a subduction zone", "A hotspot track", "A mid-ocean ridge segment", "A continental flood basalt province"],
  correctAnswer: 1,
  explanation: "A hotspot track is produced when a plate moves over a fixed mantle plume. The current volcano is over the plume, while older, extinct volcanoes trail off in the direction of plate motion. The Hawaiian–Emperor chain is the classic example.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q028", sectionId: "EARTH-04", topicId: "earth-d4", difficulty: "medium", type: "single",
  question: "Higher rates of seafloor spreading at mid-ocean ridges tend to:",
  options: ["Lower sea level by displacing less water", "Raise sea level because faster ridges are hotter and more buoyant, displacing more water", "Have no effect on sea level", "Cause widespread glaciation"],
  correctAnswer: 1,
  explanation: "Faster seafloor spreading produces hotter, more buoyant, larger mid-ocean ridges that displace more ocean water, raising global sea level. Slower spreading produces cooler, smaller ridges and lower sea level.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-04-Q029", sectionId: "EARTH-04", topicId: "earth-d4", difficulty: "hard", type: "single",
  question: "The Red Sea is often cited as an example of:",
  options: ["A mature ocean basin", "A continent–continent collision zone", "An early stage of ocean basin formation (a young rift)", "A transform plate boundary"],
  correctAnswer: 2,
  explanation: "The Red Sea is an incipient ocean basin forming where the African and Arabian plates are rifting apart. It is at an early stage of the Wilson cycle — what the Atlantic Ocean may have looked like ~150 million years ago.",
  sourceCitation: "Standard Earth science curriculum" },






// ════════════════════════════════════════════════════════════════════
// EARTH-E: Weathering, Erosion & Landforms
// ════════════════════════════════════════════════════════════════════


// ── Topic earth-e1: Weathering: Physical, Chemical & Biological ──


{ id: "EARTH-05-Q001", sectionId: "EARTH-05", topicId: "earth-e1", difficulty: "easy", type: "single",
  question: "Which of the following is the MOST important chemical weathering process on Earth's surface?",
  options: ["Oxidation", "Hydrolysis", "Carbonation", "Solution"],
  correctAnswer: 1,
  explanation: "Hydrolysis — the reaction of water with silicate minerals to form new clay minerals (e.g., feldspar → kaolinite) — is the most important and widespread chemical weathering process. It dominates in hot, wet climates and produces most of the world's clay.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q002", sectionId: "EARTH-05", topicId: "earth-e1", difficulty: "easy", type: "single",
  question: "Frost wedging (freeze–thaw weathering) is most effective in:",
  options: ["Hot, dry deserts", "Cold, alpine climates with frequent freeze-thaw cycles", "Hot, humid tropical rainforests", "Deep ocean basins"],
  correctAnswer: 1,
  explanation: "Frost wedging requires water to enter cracks, freeze, and expand (~9% volume increase) repeatedly. It is most effective in cold alpine and periglacial environments where temperatures oscillate around 0 °C.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q003", sectionId: "EARTH-05", topicId: "earth-e1", difficulty: "medium", type: "true_false",
  question: "Exfoliation at Half Dome in Yosemite is caused primarily by oxidation of iron-bearing minerals.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. Exfoliation at Half Dome and similar granite domes is caused by UNLOADING — the release of pressure as overlying rock is eroded away. The granite expands and produces curved sheet joints parallel to the surface, with slabs eventually spalling off. It is a physical process, not chemical.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q004", sectionId: "EARTH-05", topicId: "earth-e1", difficulty: "medium", type: "single",
  question: "Which climate favours the fastest CHEMICAL weathering?",
  options: ["Cold and dry", "Hot and dry", "Hot and wet", "Cold and wet"],
  correctAnswer: 2,
  explanation: "Chemical weathering rates roughly double for every 10 °C rise in temperature, and water is essential for hydrolysis, carbonation, and solution. The combination of high temperature and abundant water in hot, wet tropical climates produces the most intense chemical weathering.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q005", sectionId: "EARTH-05", topicId: "earth-e1", difficulty: "hard", type: "single",
  question: "Which reaction best describes the carbonation weathering of limestone?",
  options: ["Fe²⁺ + O₂ → Fe³⁺ (rust)", "CaCO₃ + H₂CO₃ → Ca²⁺ + 2 HCO₃⁻", "2 KAlSi₃O₈ + 2 H₂CO₃ + 9 H₂O → Al₂Si₂O₅(OH)₄ + 2 K⁺ + 2 HCO₃⁻ + 4 H₄SiO₄", "SiO₂ + 2 H₂O → H₄SiO₄"],
  correctAnswer: 1,
  explanation: "Carbonation weathering of limestone: rainwater absorbs CO₂ to form weak carbonic acid (H₂CO₃), which reacts with calcium carbonate to form soluble calcium bicarbonate, which is carried away in solution. The other equations describe oxidation, hydrolysis of feldspar to clay, and solution of silica.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q006", sectionId: "EARTH-05", topicId: "earth-e1", difficulty: "hard", type: "single",
  question: "Over geological time, the chemical weathering of silicate rocks helps to:",
  options: ["Increase atmospheric CO₂ levels", "Remove CO₂ from the atmosphere, stabilizing climate", "Have no effect on atmospheric CO₂", "Produce volcanic eruptions"],
  correctAnswer: 1,
  explanation: "When silicates weather, they consume atmospheric CO₂ (locked up as bicarbonate ions that eventually form carbonate sediments in the ocean). This is the long-term carbonate–silicate climate stabilizer — when CO₂ is high, weathering speeds up, removing CO₂; when CO₂ is low, weathering slows. It has kept Earth's climate habitable over billions of years.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q007", sectionId: "EARTH-05", topicId: "earth-e1", difficulty: "medium", type: "single",
  question: "Which of the following is a biological contributor to weathering?",
  options: ["Frost wedging", "Hydrolysis", "Lichen secretion of organic acids", "Salt crystal growth"],
  correctAnswer: 2,
  explanation: "Lichens and mosses secrete organic acids that chemically break down rock, and plant roots pry rock apart physically. These biological processes contribute to both physical and chemical weathering.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-e2: Erosion & Mass Wasting ──


{ id: "EARTH-05-Q008", sectionId: "EARTH-05", topicId: "earth-e2", difficulty: "easy", type: "single",
  question: "Which of the following is the dominant agent of erosion on continents globally?",
  options: ["Wind", "Glaciers", "Running water (rivers and streams)", "Waves"],
  correctAnswer: 2,
  explanation: "Running water is the dominant erosional agent on continents. Although glaciers and wind receive more attention, rivers and streams do most of the erosional work across most of Earth's land surface, carving valleys, transporting sediment, and shaping landscapes.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q009", sectionId: "EARTH-05", topicId: "earth-e2", difficulty: "medium", type: "single",
  question: "Deflation is a process of wind erosion that refers to:",
  options: ["The sandblasting of rocks by wind-borne particles", "The removal of loose, fine sediment by the wind", "The formation of sand dunes", "The deposition of loess"],
  correctAnswer: 1,
  explanation: "Deflation is the removal of loose, fine sediment (silt, clay, fine sand) by the wind, leaving behind coarser particles as a desert pavement. Abrasion is the related process where wind-blown sand acts like sandpaper, smoothing and shaping rock surfaces.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q010", sectionId: "EARTH-05", topicId: "earth-e2", difficulty: "medium", type: "single",
  question: "Glacial erosion occurs mainly by which two processes?",
  options: ["Deflation and abrasion", "Plucking and abrasion", "Hydraulic action and solution", "Frost wedging and hydrolysis"],
  correctAnswer: 1,
  explanation: "Plucking is the process by which a glacier freezes onto bedrock and tears off blocks as it moves. Abrasion is the grinding of bedrock by rock fragments embedded in the ice. Together, they carve the U-shaped valleys, cirques, and other glacial landforms.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q011", sectionId: "EARTH-05", topicId: "earth-e2", difficulty: "easy", type: "single",
  question: "Which of the following is the SLOWEST form of mass wasting?",
  options: ["Rockfall", "Debris flow", "Soil creep", "Lahar"],
  correctAnswer: 2,
  explanation: "Soil creep is the slowest form of mass wasting — typically only millimetres per year. It is recognized by tilted fence posts, curved tree trunks, and disrupted soil horizons. The other options are all much faster and more destructive.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q012", sectionId: "EARTH-05", topicId: "earth-e2", difficulty: "hard", type: "single",
  question: "A lahar is best described as:",
  options: ["A type of glacial moraine", "A volcanic mudflow", "A sand dune in a desert", "A coral reef landform"],
  correctAnswer: 1,
  explanation: "A lahar is a volcanic mudflow — a fast-moving mixture of volcanic ash, rock debris, and water. Lahars can be triggered when eruptions melt ice/snow on the volcano's flanks, or when heavy rain mobilizes fresh ash. The 1985 Nevado del Ruiz lahar in Colombia killed about 25,000 people.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q013", sectionId: "EARTH-05", topicId: "earth-e2", difficulty: "hard", type: "single",
  question: "Which of the following is NOT a common trigger of mass wasting?",
  options: ["Heavy rainfall", "Earthquakes", "Vegetation removal", "High atmospheric pressure"],
  correctAnswer: 3,
  explanation: "Heavy rainfall saturates soil and reduces friction; earthquakes shake slopes and reduce friction; vegetation removal weakens root strength. All three can trigger mass wasting. High atmospheric pressure has no direct effect on slope stability.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q014", sectionId: "EARTH-05", topicId: "earth-e2", difficulty: "medium", type: "true_false",
  question: "Solifluction is the slow flow of saturated soil over impermeable permafrost in cold environments.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Solifluction is the slow (cm/yr) flow of water-saturated surface soil over an impermeable frozen substrate (permafrost). It is common in Arctic and alpine periglacial environments and produces characteristic lobate features on hillslopes.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-e3: Fluvial (River) Landforms ──


{ id: "EARTH-05-Q015", sectionId: "EARTH-05", topicId: "earth-e3", difficulty: "easy", type: "single",
  question: "In the upper course of a river, the dominant landforms are:",
  options: ["Meanders and oxbow lakes", "V-shaped valleys, gorges, and waterfalls", "Deltas and alluvial fans", "Wide floodplains and levees"],
  correctAnswer: 1,
  explanation: "The upper course of a river has a steep gradient and vertical (downward) erosion dominates, producing V-shaped valleys, gorges, and waterfalls. Meanders and floodplains are characteristic of the middle and lower courses.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q016", sectionId: "EARTH-05", topicId: "earth-e3", difficulty: "medium", type: "single",
  question: "On a meander, erosion occurs on the:",
  options: ["Inner (slip-off) bank", "Outer (cut) bank", "Both banks equally", "Only the river bed, not the banks"],
  correctAnswer: 1,
  explanation: "The outer bank of a meander (called the cut bank) experiences faster water flow and is actively eroded. The inner bank (slip-off bank) has slower flow and is where deposition occurs, building a point bar.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q017", sectionId: "EARTH-05", topicId: "earth-e3", difficulty: "medium", type: "single",
  question: "An oxbow lake forms when:",
  options: ["A river cuts through a mountain range", "A meander is cut off from the main channel and sealed by deposition", "A delta builds up at a river mouth", "A river dries up in a desert"],
  correctAnswer: 1,
  explanation: "As a meander grows more pronounced, the narrow neck may be cut through during a flood, taking a shortcut. The abandoned meander, isolated from the main channel and sealed at both ends by deposition, becomes a crescent-shaped oxbow lake.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q018", sectionId: "EARTH-05", topicId: "earth-e3", difficulty: "hard", type: "single",
  question: "Which drainage pattern is most likely to develop on folded sedimentary rocks with alternating hard and soft layers?",
  options: ["Dendritic", "Trellis", "Radial", "Centripetal"],
  correctAnswer: 1,
  explanation: "Trellis drainage develops on folded sedimentary rocks: long parallel main streams follow the strike of resistant layers, while short tributaries cut down through the weaker layers at right angles, producing a rectangular, garden-trellis pattern.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q019", sectionId: "EARTH-05", topicId: "earth-e3", difficulty: "medium", type: "single",
  question: "A radial drainage pattern is most likely to develop on:",
  options: ["A uniform plain", "An isolated dome or volcano", "Folded sedimentary rocks", "A closed lake basin"],
  correctAnswer: 1,
  explanation: "Radial drainage develops where streams flow outward in all directions from a central high point — most characteristically an isolated dome (like the Black Hills) or a volcano (e.g., Mt. Fuji).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q020", sectionId: "EARTH-05", topicId: "earth-e3", difficulty: "hard", type: "single",
  question: "A delta differs from an alluvial fan in that a delta:",
  options: ["Forms at a mountain front", "Forms where a river enters standing water (ocean or lake)", "Is shaped by wind rather than water", "Is always composed of coarse gravel"],
  correctAnswer: 1,
  explanation: "An alluvial fan forms where a steep stream's gradient suddenly drops at a mountain front, depositing its sediment on land. A delta forms where a river enters standing water (ocean or lake), and the river drops its sediment load in a characteristic shape.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q021", sectionId: "EARTH-05", topicId: "earth-e3", difficulty: "easy", type: "true_false",
  question: "Dendritic drainage patterns are the most common drainage pattern worldwide.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Dendritic ('tree-like') drainage develops on flat-lying, uniform rock with no strong structural control, and is the most common drainage pattern on Earth.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-e4: Glacial & Desert (Aeolian) Landforms ──


{ id: "EARTH-05-Q022", sectionId: "EARTH-05", topicId: "earth-e4", difficulty: "easy", type: "single",
  question: "A glacial valley is most likely to have a cross-section that is:",
  options: ["V-shaped", "U-shaped", "Y-shaped", "Perfectly flat-bottomed"],
  correctAnswer: 1,
  explanation: "Glaciers widen and deepen pre-existing V-shaped river valleys, producing the characteristic U-shaped (parabolic) cross-section. The base is broad and flat, and the walls are steep.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q023", sectionId: "EARTH-05", topicId: "earth-e4", difficulty: "medium", type: "single",
  question: "A bowl-shaped depression at the head of a glacial valley is called a:",
  options: ["Hanging valley", "Cirque", "Arête", "Drumlin"],
  correctAnswer: 1,
  explanation: "A cirque is a bowl-shaped depression excavated at the head of a glacial valley by plucking and abrasion. After the ice melts, the cirque often contains a small lake called a tarn.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q024", sectionId: "EARTH-05", topicId: "earth-e4", difficulty: "medium", type: "single",
  question: "The Matterhorn is a famous example of which glacial landform?",
  options: ["Cirque", "Arête", "Horn", "Hanging valley"],
  correctAnswer: 2,
  explanation: "The Matterhorn is a horn — a pyramidal peak formed when three or more cirques erode a single mountain from different sides, leaving a steep, isolated peak. Arêtes are the sharp ridges between two cirques.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q025", sectionId: "EARTH-05", topicId: "earth-e4", difficulty: "medium", type: "single",
  question: "Drumlins are best described as:",
  options: ["Sharp ridges between two cirques", "Streamlined, whale-shaped hills of glacial till aligned with ice flow", "Sinuous ridges of sand and gravel from subglacial streams", "Crescent-shaped sand dunes"],
  correctAnswer: 1,
  explanation: "Drumlins are streamlined, asymmetric hills composed of glacial till, with their long axis parallel to the direction of ice flow. They record the final direction of glacier movement.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q026", sectionId: "EARTH-05", topicId: "earth-e4", difficulty: "hard", type: "single",
  question: "Which type of sand dune forms in areas with a constant wind direction and LIMITED sand supply?",
  options: ["Star dune", "Longitudinal dune", "Barchan dune", "Transverse dune"],
  correctAnswer: 2,
  explanation: "Barchan dunes are crescent-shaped dunes that form in areas of constant wind direction and limited sand supply, with the concave (slip-face) side facing downwind. Star dunes form where wind is variable; longitudinal dunes form where wind comes from two directions; transverse dunes form where sand is abundant and wind is constant.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q027", sectionId: "EARTH-05", topicId: "earth-e4", difficulty: "hard", type: "single",
  question: "A terminal moraine is best described as:",
  options: ["A ridge of till marking the farthest advance of a glacier", "A streamlined hill of till aligned with ice flow", "A sinuous ridge of sand and gravel from a subglacial stream", "A bowl-shaped depression at the glacier head"],
  correctAnswer: 0,
  explanation: "A terminal (end) moraine is a ridge of glacial till that marks the farthest advance of a glacier. Recessional moraines mark pauses during retreat; lateral moraines form along the glacier's sides; medial moraines form where two glaciers merge.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q028", sectionId: "EARTH-05", topicId: "earth-e4", difficulty: "medium", type: "true_false",
  question: "Pediments in desert landscapes are formed primarily by wind erosion.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. Pediments are gently sloping bedrock surfaces at the base of desert mountains, eroded mainly by running water during rare but intense storms. They are NOT formed by wind, despite being in arid regions.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-e5: Coastal & Karst Landforms ──


{ id: "EARTH-05-Q029", sectionId: "EARTH-05", topicId: "earth-e5", difficulty: "medium", type: "single",
  question: "The correct sequence of coastal erosional landforms, from earliest to latest, is:",
  options: ["Cave → Arch → Stack → Stump", "Arch → Cave → Stump → Stack", "Stack → Arch → Cave → Stump", "Stump → Stack → Cave → Arch"],
  correctAnswer: 0,
  explanation: "Waves attack a weakness in a headland, forming a notch, then a cave. Continued erosion cuts through to form an arch. The arch eventually collapses, leaving an isolated stack, which is gradually reduced to a stump.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q030", sectionId: "EARTH-05", topicId: "earth-e5", difficulty: "medium", type: "single",
  question: "Coral reefs require which set of conditions to grow?",
  options: ["Cold, deep, turbid water", "Warm, shallow, clear, sunlit water", "Cold, shallow, dark water", "Hot, deep, sediment-rich water"],
  correctAnswer: 1,
  explanation: "Reef-building corals need warm (>20 °C), shallow (<50 m), clear, sunlit, sediment-free water. The symbiotic algae (zooxanthellae) living in the coral require sunlight for photosynthesis, which restricts reefs to the photic zone.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q031", sectionId: "EARTH-05", topicId: "earth-e5", difficulty: "easy", type: "single",
  question: "Stalactites and stalagmites are depositional features found in:",
  options: ["River caves cut by water erosion", "Karst caves formed by limestone dissolution", "Volcanic lava tubes", "Glacier ice caves"],
  correctAnswer: 1,
  explanation: "Stalactites (hanging from the ceiling) and stalagmites (rising from the floor) form in karst caves by precipitation of CaCO₃ from water dripping through limestone. As water loses CO₂ and evaporates, dissolved calcium carbonate is deposited.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q032", sectionId: "EARTH-05", topicId: "earth-e5", difficulty: "medium", type: "single",
  question: "Which of the following best describes a tombolo?",
  options: ["A long, narrow sand ridge attached to the mainland at one end", "A sand ridge connecting an offshore island to the mainland", "A long, narrow island parallel to the coast", "A coral reef surrounding a lagoon"],
  correctAnswer: 1,
  explanation: "A tombolo is a sand or gravel ridge that connects an offshore island to the mainland. A spit is similar but attached only at one end to the mainland. A barrier island is detached from the coast by a lagoon.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q033", sectionId: "EARTH-05", topicId: "earth-e5", difficulty: "hard", type: "single",
  question: "Tower karst landscapes (e.g., Guilin, China) form by:",
  options: ["Volcanic eruption", "Long-term dissolution of limestone in a humid tropical climate", "Glacial erosion", "Sand dune accumulation"],
  correctAnswer: 1,
  explanation: "Tower karst consists of isolated, steep-sided limestone hills rising from a flat alluvial plain. It forms by long-term chemical dissolution in humid tropical climates where abundant rainfall accelerates limestone solution along joints and fractures.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-05-Q034", sectionId: "EARTH-05", topicId: "earth-e5", difficulty: "medium", type: "true_false",
  question: "A spit is attached to the mainland at both ends, while a tombolo is attached at one end only.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. The opposite is true: a spit is attached to the mainland at ONE end (and extends into open water at the other), while a tombolo connects an island to the mainland (attached at the mainland end and to the island at the other).",
  sourceCitation: "Standard Earth science curriculum" },






// ════════════════════════════════════════════════════════════════════
// EARTH-F: Structural Geology & Deformation
// ════════════════════════════════════════════════════════════════════


// ── Topic earth-f1: Stress, Strain & Rock Deformation ──


{ id: "EARTH-06-Q001", sectionId: "EARTH-06", topicId: "earth-f1", difficulty: "easy", type: "single",
  question: "Stress in geology is best defined as:",
  options: ["The change in shape of a rock", "Force per unit area applied to a rock", "The temperature at which a rock deforms", "The rate at which a rock deforms"],
  correctAnswer: 1,
  explanation: "Stress = force per unit area applied to a rock (units: Pa or MPa). Strain is the resulting change in shape or volume. Stress is the cause; strain is the effect.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q002", sectionId: "EARTH-06", topicId: "earth-f1", difficulty: "easy", type: "single",
  question: "Which type of stress is associated with divergent plate boundaries?",
  options: ["Compressional", "Tensional", "Shear", "Confining"],
  correctAnswer: 1,
  explanation: "Tensional stress (pulling apart) is associated with divergent plate boundaries, where two plates move away from each other. Compressional stress is associated with convergent boundaries; shear with transform boundaries.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q003", sectionId: "EARTH-06", topicId: "earth-f1", difficulty: "medium", type: "true_false",
  question: "Higher temperatures generally make rocks behave more ductilely (plastically).",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Higher temperatures allow rocks to deform plastically (by recrystallization, dislocation creep, etc.) rather than fracturing. This is why deep crustal rocks can flow and fold, while the same rocks at the surface would shatter.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q004", sectionId: "EARTH-06", topicId: "earth-f1", difficulty: "medium", type: "single",
  question: "Earthquakes occur in which zone of the crust?",
  options: ["The ductile (plastic) zone, deep in the crust", "The brittle zone, above the brittle–ductile transition", "Only at the Moho", "Only in oceanic crust"],
  correctAnswer: 1,
  explanation: "Earthquakes require brittle behaviour — the rock must be able to store elastic strain energy and release it suddenly. Above the brittle–ductile transition (~10–15 km in continental crust), rocks are cold and strong enough to fracture; below it, they deform plastically and aseismically.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q005", sectionId: "EARTH-06", topicId: "earth-f1", difficulty: "hard", type: "single",
  question: "Deep-focus earthquakes (up to ~700 km) occur only in:",
  options: ["The lower mantle everywhere", "Cold subducting slabs that remain brittle to great depth", "Hotspots", "Mid-ocean ridges"],
  correctAnswer: 1,
  explanation: "Deep-focus earthquakes occur in the cold interior of subducting slabs. The slab descends faster than it can warm up, so even at 700 km depth it remains cold and brittle enough to fracture. Outside of subducting slabs, the mantle is too hot and ductile to produce earthquakes.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q006", sectionId: "EARTH-06", topicId: "earth-f1", difficulty: "hard", type: "single",
  question: "Which combination of conditions favours BRITTLE deformation of rock?",
  options: ["High temperature, high confining pressure, slow strain rate", "Low temperature, low confining pressure, fast strain rate", "High temperature, low confining pressure, slow strain rate", "Low temperature, high confining pressure, fast strain rate"],
  correctAnswer: 1,
  explanation: "Brittle deformation is favoured by low temperature, low confining pressure, fast strain rate, and hard rock type. These conditions apply in the upper crust and in sudden events (e.g., earthquakes). The opposite conditions favour ductile deformation.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q007", sectionId: "EARTH-06", topicId: "earth-f1", difficulty: "medium", type: "single",
  question: "The brittle–ductile transition in the continental crust is typically found at a depth of:",
  options: ["~1 km", "~10–15 km", "~50–70 km", "~300 km"],
  correctAnswer: 1,
  explanation: "The brittle–ductile transition is at about 10–15 km depth in typical continental crust (corresponding to ~300 °C for granite). Above this depth, rocks deform by fracturing; below it, they deform plastically.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-f2: Folds: Anticlines, Synclines & More ──


{ id: "EARTH-06-Q008", sectionId: "EARTH-06", topicId: "earth-f2", difficulty: "easy", type: "single",
  question: "In an anticline, the OLDEST rocks are found:",
  options: ["At the surface only", "On the limbs", "In the centre (core) of the fold", "At the bottom of a well"],
  correctAnswer: 2,
  explanation: "In an anticline (an upward-arching fold), the oldest rocks are exposed in the centre of the fold, because the layers have been bent up and the older core is now at the topographic centre. In a syncline, the youngest rocks are in the centre.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q009", sectionId: "EARTH-06", topicId: "earth-f2", difficulty: "medium", type: "single",
  question: "A fold whose axial plane is nearly horizontal and in which one limb lies overturned on the other is called:",
  options: ["Chevron fold", "Isoclinal fold", "Recumbent fold", "Plunging fold"],
  correctAnswer: 2,
  explanation: "A recumbent fold has an axial plane that is nearly horizontal, with one limb inverted on top of the other. It indicates extreme compression, common in the deep roots of mountain belts.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q010", sectionId: "EARTH-06", topicId: "earth-f2", difficulty: "medium", type: "true_false",
  question: "Anticlines always form hills and synclines always form valleys.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. The topographic expression of a fold depends on its age and erosion history. An eroded anticline can form a valley (e.g., the famous 'anticline valley' in some Appalachian ridges); an eroded syncline can form a ridge. The rule is a useful starting point, not a universal truth.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q011", sectionId: "EARTH-06", topicId: "earth-f2", difficulty: "hard", type: "single",
  question: "A plunging fold is one in which:",
  options: ["The fold has been overturned", "The hinge line is tilted into the ground", "The limbs are parallel (isoclinal)", "The fold has recumbent geometry"],
  correctAnswer: 1,
  explanation: "A plunging fold has a hinge line that is not horizontal but tilts ('plunges') into the ground. Plunging folds produce characteristic V-shaped or 'nose' outcrop patterns on geological maps.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q012", sectionId: "EARTH-06", topicId: "earth-f2", difficulty: "medium", type: "single",
  question: "A geological structure in which the OLDEST rocks are exposed in a circular outcrop pattern, with progressively younger rocks outward, is best described as:",
  options: ["A basin", "A dome", "A monocline", "A thrust fault"],
  correctAnswer: 1,
  explanation: "A dome is a doubly plunging anticline — the fold closes in two opposite directions. Erosion exposes the oldest rocks at the centre, with progressively younger rocks outward in a circular or elliptical pattern. (A basin, by contrast, has the youngest rocks in the centre.)",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q013", sectionId: "EARTH-06", topicId: "earth-f2", difficulty: "hard", type: "single",
  question: "A monocline is best described as:",
  options: ["A doubly plunging anticline", "A one-step bend connecting two horizontal levels", "A fold with two parallel limbs", "A recumbent fold"],
  correctAnswer: 1,
  explanation: "A monocline is a one-step fold: flat-lying rocks are bent up or down to a different horizontal level. Monoclines are common over buried basement faults, where the cover rocks drape over the offset in the basement.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-f3: Faults: Normal, Reverse, Thrust & Strike-Slip ──


{ id: "EARTH-06-Q014", sectionId: "EARTH-06", topicId: "earth-f3", difficulty: "easy", type: "single",
  question: "The hanging wall of a fault is:",
  options: ["The rock below the fault plane", "The rock above the fault plane", "Always on the right side of the fault", "A type of igneous intrusion"],
  correctAnswer: 1,
  explanation: "The hanging wall is the rock block ABOVE the fault plane; the footwall is BELOW. Mnemonic: 'hang your hat on the hanging wall, put your boots on the footwall.'",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q015", sectionId: "EARTH-06", topicId: "earth-f3", difficulty: "medium", type: "single",
  question: "A normal fault is characterized by:",
  options: ["Hanging wall moving up", "Hanging wall moving down", "Horizontal motion", "No displacement"],
  correctAnswer: 1,
  explanation: "In a normal fault, the hanging wall moves DOWN relative to the footwall. Normal faults are produced by tensional stress and are characteristic of divergent plate boundaries (e.g., Basin and Range, East African Rift, mid-ocean ridge flanks).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q016", sectionId: "EARTH-06", topicId: "earth-f3", difficulty: "medium", type: "single",
  question: "A thrust fault is best described as:",
  options: ["A high-angle reverse fault", "A low-angle reverse fault (dip <30°)", "A strike-slip fault with vertical motion", "A normal fault with horizontal extension"],
  correctAnswer: 1,
  explanation: "A thrust fault is a low-angle (dip <30°) reverse fault, in which the hanging wall moves up and over the footwall along a gently inclined fault plane. Thrusts are common in continental collisions (e.g., Himalayas, Alps) and can transport rock sheets tens of km.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q017", sectionId: "EARTH-06", topicId: "earth-f3", difficulty: "hard", type: "single",
  question: "The San Andreas Fault in California is best classified as:",
  options: ["A normal fault", "A reverse fault", "A right-lateral strike-slip fault", "A left-lateral strike-slip fault"],
  correctAnswer: 2,
  explanation: "The San Andreas Fault is a right-lateral (dextral) strike-slip fault: rocks on the opposite side of the fault appear to move to the right. It is a transform plate boundary between the Pacific and North American plates.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q018", sectionId: "EARTH-06", topicId: "earth-f3", difficulty: "medium", type: "true_false",
  question: "A reverse fault is produced by tensional stress.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. A reverse fault is produced by COMPRESSIONAL stress — the rock is being squeezed, and the hanging wall moves UP relative to the footwall. Tensional stress produces normal faults, not reverse faults.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q019", sectionId: "EARTH-06", topicId: "earth-f3", difficulty: "hard", type: "single",
  question: "The North Anatolian Fault in Turkey is an example of:",
  options: ["A normal fault", "A reverse fault", "A right-lateral strike-slip fault", "A left-lateral strike-slip fault"],
  correctAnswer: 3,
  explanation: "The North Anatolian Fault is a left-lateral (sinistral) strike-slip fault, accommodating westward motion of the Anatolian block relative to the Eurasian plate. It has produced several major earthquakes in the 20th and 21st centuries.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q020", sectionId: "EARTH-06", topicId: "earth-f3", difficulty: "medium", type: "single",
  question: "Which type of fault is most likely to be found at a continental collision zone?",
  options: ["Normal", "Thrust / reverse", "Transform / strike-slip", "No faults are found at collision zones"],
  correctAnswer: 1,
  explanation: "Continental collision zones (Himalayas, Alps, Appalachians) are dominated by thrust and reverse faults, produced by the compressional stress of the converging plates. These faults stack rock sheets and thicken the crust, building high mountains.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q021", sectionId: "EARTH-06", topicId: "earth-f3", difficulty: "hard", type: "single",
  question: "A joint is best described as:",
  options: ["A fracture with significant displacement", "A fracture with no appreciable displacement", "A type of fold", "An igneous intrusion"],
  correctAnswer: 1,
  explanation: "A joint is a fracture in rock along which there has been NO appreciable displacement. Joints are extremely common in the upper crust and form in sets with consistent orientations. They control groundwater flow, slope stability, and ore vein geometry.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-f4: Joints, Mountain Building & Tectonic Structures ──


{ id: "EARTH-06-Q022", sectionId: "EARTH-06", topicId: "earth-f4", difficulty: "medium", type: "single",
  question: "Columnar jointing, as seen at the Giant's Causeway in Northern Ireland, is produced by:",
  options: ["Tectonic compression", "Cooling and contraction of a thick lava flow", "Frost wedging", "Glacial erosion"],
  correctAnswer: 1,
  explanation: "Columnar jointing forms when a thick lava flow or shallow igneous intrusion cools slowly and uniformly. As the rock cools, it contracts and fractures into polygonal (typically hexagonal) columns perpendicular to the cooling surface. The Giant's Causeway and Devils Tower are classic examples.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q023", sectionId: "EARTH-06", topicId: "earth-f4", difficulty: "easy", type: "single",
  question: "Exfoliation joints in granitic landscapes (e.g., Half Dome, Yosemite) are produced by:",
  options: ["Tectonic compression", "Pressure release (unloading) as overlying rock is eroded", "Salt weathering", "Glacial plucking"],
  correctAnswer: 1,
  explanation: "Exfoliation joints are curved sheet joints produced by the release of pressure as overlying rock is removed by erosion. The granite expands, producing curved joints parallel to the topographic surface, and slabs of rock spall off.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q024", sectionId: "EARTH-06", topicId: "earth-f4", difficulty: "medium", type: "true_false",
  question: "A foreland basin typically receives sediment eroded from a nearby rising mountain belt.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. A foreland basin is a sedimentary basin formed on the continental side of a mountain belt, where the lithosphere flexes downward under the weight of the thrust stack. It receives enormous volumes of sediment eroded from the rising mountains (e.g., the Ganges basin south of the Himalayas).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q025", sectionId: "EARTH-06", topicId: "earth-f4", difficulty: "hard", type: "single",
  question: "Isostatic rebound in a mountain range occurs because:",
  options: ["Magma intrudes at depth and pushes the mountains up", "Erosion removes mass from the top, and the underlying asthenosphere flows back in to maintain equilibrium", "Plate motion compresses the crust", "Sea level falls"],
  correctAnswer: 1,
  explanation: "As a mountain belt is eroded, mass is removed from the top. To maintain isostatic equilibrium, the underlying asthenosphere flows back in and the crust rises. This isostatic rebound is what allows mountain ranges like the Himalayas to maintain their height despite active erosion.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q026", sectionId: "EARTH-06", topicId: "earth-f4", difficulty: "hard", type: "single",
  question: "An accretionary wedge is best described as:",
  options: ["A mass of sediment and rock scraped off a subducting plate and added to the overriding plate", "A type of mountain range formed at a continental rift", "A pile of volcanic ash from an explosive eruption", "An underwater landslide deposit"],
  correctAnswer: 0,
  explanation: "An accretionary wedge forms at subduction zones: as the oceanic plate descends, sediments and rock fragments are scraped off its surface and accreted to the overriding plate, building a wedge of deformed, often chaotic material (melange) above the subduction zone.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-06-Q027", sectionId: "EARTH-06", topicId: "earth-f4", difficulty: "medium", type: "single",
  question: "A typical architecture of a continental collision mountain belt, from the suture outward, includes:",
  options: ["Undeformed foreland, then thrust sheets, then metamorphic core", "Metamorphic core, then thrust sheets, then foreland fold-thrust belt, then foreland basin", "Volcanic arc, then trench, then accretionary wedge", "Sedimentary basin, then volcanic arc, then oceanic trench"],
  correctAnswer: 1,
  explanation: "A typical collision mountain belt (Himalayas, Alps) has, from the suture outward: a high-grade metamorphic core (gneiss, schist, granites), a stack of thrust sheets, a foreland fold-and-thrust belt, and a foreland basin receiving eroded sediment.",
  sourceCitation: "Standard Earth science curriculum" },






// ════════════════════════════════════════════════════════════════════
// EARTH-G: Volcanism
// ════════════════════════════════════════════════════════════════════


// ── Topic earth-g1: Magma vs. Lava, Composition & Properties ──


{ id: "EARTH-07-Q001", sectionId: "EARTH-07", topicId: "earth-g1", difficulty: "easy", type: "single",
  question: "Magma differs from lava in that:",
  options: ["Magma is solid; lava is molten", "Magma is molten rock below the surface; lava is molten rock at the surface", "Magma is felsic; lava is mafic", "Magma is hotter than lava"],
  correctAnswer: 1,
  explanation: "Magma is molten rock BELOW Earth's surface (including dissolved gases, crystals, and rock fragments). Lava is the same molten rock once it reaches the surface. They differ in location only — not necessarily in composition or temperature.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-07-Q002", sectionId: "EARTH-07", topicId: "earth-g1", difficulty: "medium", type: "single",
  question: "Which magma type is the LEAST viscous (most fluid)?",
  options: ["Felsic", "Intermediate", "Mafic (basaltic)", "All have similar viscosity"],
  correctAnswer: 2,
  explanation: "Mafic (basaltic) magma has the lowest silica content (~50% SiO₂) and therefore the lowest viscosity. Felsic magma has >65% SiO₂ and is highly polymerised, making it very viscous. Higher SiO₂ → more polymerisation → higher viscosity.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-07-Q003", sectionId: "EARTH-07", topicId: "earth-g1", difficulty: "medium", type: "single",
  question: "High-viscosity felsic magmas tend to produce which type of eruption?",
  options: ["Effusive (quiet, flowing)", "Highly explosive", "Lava-fountain style", "Underwater pillow eruptions"],
  correctAnswer: 1,
  explanation: "Viscous felsic magmas trap gases inside the magma chamber. Pressure builds until it overcomes the strength of the overlying rock, and the magma explodes — fragmenting into ash, pumice, and pyroclastic material. This is why rhyolitic and andesitic volcanoes (e.g., Mt. St. Helens, Mt. Pinatubo) are explosive.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-07-Q004", sectionId: "EARTH-07", topicId: "earth-g1", difficulty: "easy", type: "true_false",
  question: "Basaltic (mafic) magma is the most common magma type on Earth.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Basaltic magma is produced in huge volumes at mid-ocean ridges and hotspots by decompression melting. It forms the entire oceanic crust and is the most abundant volcanic rock on Earth (e.g., Hawaii, Iceland, mid-ocean ridges).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-07-Q005", sectionId: "EARTH-07", topicId: "earth-g1", difficulty: "hard", type: "single",
  question: "The three main tectonic sources of magma are:",
  options: ["Hotspots only", "Mantle plumes, mid-ocean ridges, subduction zones", "Continental collisions only", "Impacts and bolide events"],
  correctAnswer: 1,
  explanation: "Magmas form by three main processes: (1) decompression melting at mid-ocean ridges and hotspots (basaltic), (2) flux melting at subduction zones (water from the slab lowers the melting point of the mantle wedge, producing basaltic to andesitic magma), (3) crustal melting in continental arcs and rifts (felsic, from melting of the continental crust).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-07-Q006", sectionId: "EARTH-07", topicId: "earth-g1", difficulty: "hard", type: "single",
  question: "As silica content of magma increases, viscosity typically:",
  options: ["Decreases", "Increases", "Stays the same", "First decreases, then increases"],
  correctAnswer: 1,
  explanation: "Higher SiO₂ content produces longer polymerised silicate chains, increasing resistance to flow. Felsic magmas (>65% SiO₂) are extremely viscous; mafic magmas (~50% SiO₂) are fluid. Temperature and gas content also matter, but silica is the dominant control.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-g2: Volcano Types & Eruptive Styles ──


{ id: "EARTH-07-Q007", sectionId: "EARTH-07", topicId: "earth-g2", difficulty: "easy", type: "single",
  question: "A shield volcano such as Mauna Loa (Hawaii) is characterised by:",
  options: ["Steep slopes and explosive eruptions", "Gentle slopes and effusive (flowing) basaltic eruptions", "A small cone built of pyroclastic fragments", "A large collapse depression at the summit"],
  correctAnswer: 1,
  explanation: "Shield volcanoes have gentle slopes (2–10°) and are built by many eruptions of fluid basaltic lava that flows long distances. They are not explosive. Mauna Loa is the classic example and is one of the largest volcanoes on Earth by volume.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-07-Q008", sectionId: "EARTH-07", topicId: "earth-g2", difficulty: "medium", type: "single",
  question: "A composite (stratovolcano) such as Mt. Fuji is characterised by:",
  options: ["Basaltic lava and gentle slopes", "Layered structure, intermediate to felsic magma, and explosive eruptions", "A large collapse caldera", "A small pyroclastic cone"],
  correctAnswer: 1,
  explanation: "Composite volcanoes have steep, layered cones built of alternating lava flows and pyroclastic deposits. They erupt viscous andesitic to felsic magma, producing explosive eruptions with pyroclastic flows, lahars, and ash falls. Mt. Fuji, Mt. St. Helens, and Mt. Pinatubo are classic examples.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-07-Q009", sectionId: "EARTH-07", topicId: "earth-g2", difficulty: "medium", type: "single",
  question: "A caldera (e.g., Yellowstone) is best described as:",
  options: ["A small, steep pyroclastic cone", "A large collapse depression formed when a magma chamber empties", "A volcanic vent on the flank of a larger volcano", "A type of lava flow"],
  correctAnswer: 1,
  explanation: "A caldera is a large, basin-shaped depression formed when a magma chamber partially empties during a major eruption and the overlying rock collapses. Yellowstone is a 70 × 50 km caldera that has produced three 'supereruptions' in the past 2 million years.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-07-Q010", sectionId: "EARTH-07", topicId: "earth-g2", difficulty: "easy", type: "true_false",
  question: "Cinder cones are typically large, long-lived volcanic structures.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. Cinder cones are small (typically 100–400 m high), steep (up to 35°), short-lived structures built from pyroclastic fragments (ash, cinders, bombs) ejected from a single vent. They often form in monogenetic fields, where each eruption produces a separate cone. Parícutin (Mexico, 1943) is a famous example — it grew in a farmer's field in less than a year.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-07-Q011", sectionId: "EARTH-07", topicId: "earth-g2", difficulty: "hard", type: "single",
  question: "Match the eruption style with its correct description:",
  options: ["Hawaiian — huge eruption column > 30 km", "Plinian — effusive lava fountaining", "Surtseyan — explosive water–magma interaction", "Strombolian — collapse of a magma chamber"],
  correctAnswer: 2,
  explanation: "Surtseyan eruptions are explosive because magma interacts with water (groundwater, lakes, or seawater) and flashes it to steam. Hawaiian eruptions are effusive fire-fountain eruptions; Plinian eruptions are huge vertical eruption columns; Strombolian eruptions are mild, periodic bursts. Only the third option (Surtseyan) is correctly matched.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-07-Q012", sectionId: "EARTH-07", topicId: "earth-g2", difficulty: "hard", type: "single",
  question: "Which combination of magma type and volcano type is MOST likely to be found at a subduction zone?",
  options: ["Basaltic magma + shield volcano", "Andesitic magma + composite volcano", "Rhyolitic magma + cinder cone", "Komatiitic magma + lava dome"],
  correctAnswer: 1,
  explanation: "Subduction zones produce andesitic magma (from flux melting of the mantle wedge) and are characterised by composite (stratovolcano) landforms with explosive eruptions. The Andes, Japan, the Cascades, and the Aleutians are classic examples.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-g3: Volcanic Products, Hazards & Benefits ──


{ id: "EARTH-07-Q013", sectionId: "EARTH-07", topicId: "earth-g3", difficulty: "easy", type: "single",
  question: "Pahoehoe lava is best described as:",
  options: ["Rough, jagged, broken lava blocks", "Smooth, ropy, billowy basaltic lava", "Pillow-shaped masses formed underwater", "Solid rock fragments ejected in explosions"],
  correctAnswer: 1,
  explanation: "Pahoehoe (Hawaiian) is smooth, ropy, billowy basaltic lava formed by hotter, more fluid lava. As the surface cools and develops a thin skin, lava continues to flow beneath, folding the skin into ropes. Aa (also Hawaiian) is rougher, jagged basaltic lava formed by slightly cooler, more viscous flow.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-07-Q014", sectionId: "EARTH-07", topicId: "earth-g3", difficulty: "medium", type: "single",
  question: "Pillow lava is characteristic of:",
  options: ["Volcanoes in cold polar regions", "Underwater eruptions, such as at mid-ocean ridges", "Subduction-zone composite volcanoes", "Hotspot volcanoes on continents"],
  correctAnswer: 1,
  explanation: "Pillow lava forms when basaltic lava erupts underwater: the rapid cooling of the outer surface produces a glassy crust, while molten lava inside continues to flow, breaking out as bulbous, rounded masses. Pillow lava is common at mid-ocean ridges and submarine volcanoes.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-07-Q015", sectionId: "EARTH-07", topicId: "earth-g3", difficulty: "medium", type: "single",
  question: "A pyroclastic flow is best described as:",
  options: ["A slow-moving lava flow", "A hot, fast, ground-hugging mixture of gas and volcanic debris", "A volcanic mudflow in a river valley", "A column of volcanic ash rising high into the atmosphere"],
  correctAnswer: 1,
  explanation: "A pyroclastic flow is a hot (300–700 °C), fast-moving (100–700 km/h) mixture of volcanic gas, ash, and rock fragments that sweeps down the flanks of a volcano. It is the most deadly volcanic phenomenon — the 1902 Mt. Pelée pyroclastic flow killed ~28,000 people in St. Pierre, Martinique, in minutes.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-07-Q016", sectionId: "EARTH-07", topicId: "earth-g3", difficulty: "medium", type: "true_false",
  question: "A lahar is a volcanic mudflow that can travel tens of kilometres down river valleys.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. A lahar is a mixture of volcanic ash and water (from melted snow/ice, crater lakes, or heavy rain) that flows down valleys at high speed. The 1985 Nevado del Ruiz lahar in Colombia killed about 25,000 people when it swept down river valleys tens of km from the volcano.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-07-Q017", sectionId: "EARTH-07", topicId: "earth-g3", difficulty: "hard", type: "single",
  question: "Which volcanic gas is primarily responsible for short-term global cooling after a major eruption?",
  options: ["CO₂", "SO₂", "H₂O", "HCl"],
  correctAnswer: 1,
  explanation: "SO₂ injected into the stratosphere converts to sulphate aerosols, which reflect sunlight and cool the lower atmosphere. The 1991 Pinatubo eruption cooled global temperatures by about 0.5 °C for about a year; the 1815 Tambora eruption caused the 'Year Without a Summer' in 1816.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-07-Q018", sectionId: "EARTH-07", topicId: "earth-g3", difficulty: "medium", type: "single",
  question: "Which of the following is NOT a benefit of volcanoes?",
  options: ["Fertile volcanic soils for agriculture", "Geothermal energy (e.g., Iceland)", "Porphyry copper, gold, and silver deposits", "Permanent destruction of nearby land with no recovery"],
  correctAnswer: 3,
  explanation: "Volcanoes bring important benefits: fertile soils (Java, Italy, Pacific Northwest), geothermal energy (Iceland, New Zealand, Philippines, Kenya), mineral deposits (porphyry copper, gold, silver, sulfur), and new land (Surtsey, Iceland 1963–67). 'Permanent destruction' is a hazard, not a benefit.",
  sourceCitation: "Standard Earth science curriculum" },




// ════════════════════════════════════════════════════════════════════
// EARTH-H: Earthquakes & Seismology
// ════════════════════════════════════════════════════════════════════


// ── Topic earth-h1: Earthquake Causes, Terminology & Source Mechanics ──


{ id: "EARTH-08-Q001", sectionId: "EARTH-08", topicId: "earth-h1", difficulty: "easy", type: "single",
  question: "The point on Earth's surface directly above the focus of an earthquake is called the:",
  options: ["Hypocenter", "Epicenter", "Focal depth", "Fault trace"],
  correctAnswer: 1,
  explanation: "The epicenter is the point on Earth's surface directly above the focus (hypocenter), which is the actual underground location of the earthquake's origin.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q002", sectionId: "EARTH-08", topicId: "earth-h1", difficulty: "medium", type: "single",
  question: "A 'shallow' earthquake is one with a focal depth of:",
  options: ["< 70 km", "70–300 km", "300–700 km", "More than 700 km"],
  correctAnswer: 0,
  explanation: "Focal depths: shallow (<70 km), intermediate (70–300 km), deep (300–700 km). Most destructive earthquakes are shallow; deep earthquakes only occur in cold subducting slabs.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q003", sectionId: "EARTH-08", topicId: "earth-h1", difficulty: "easy", type: "true_false",
  question: "Tectonic earthquakes caused by sudden fault slip are the most common type of earthquake.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Tectonic earthquakes (sudden slip on a fault) account for the vast majority of all earthquakes. Volcanic, collapse, and induced earthquakes are much less common.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q004", sectionId: "EARTH-08", topicId: "earth-h1", difficulty: "hard", type: "single",
  question: "According to the Elastic Rebound Theory, the sequence of events during an earthquake is:",
  options: ["Rupture → elastic strain → stress → seismic waves", "Stress → elastic strain → sudden slip (rupture) → rebound → seismic waves", "Seismic waves → stress → rupture → rebound", "Rebound → stress → rupture → seismic waves"],
  correctAnswer: 1,
  explanation: "Elastic Rebound Theory (Reid, 1910): tectonic stress slowly deforms the rock elastically, storing strain energy. When stress exceeds the fault's frictional strength, the fault slips suddenly. The rock 'rebounds' to a less stressed state, releasing the stored energy as seismic waves.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q005", sectionId: "EARTH-08", topicId: "earth-h1", difficulty: "medium", type: "single",
  question: "Aftershocks following a mainshock generally:",
  options: ["Increase in frequency over time", "Decrease in frequency over time, following Omori's law", "Are always larger than the mainshock", "Occur only on the opposite side of the fault"],
  correctAnswer: 1,
  explanation: "Aftershocks decrease in frequency over time, approximately as 1/t (Omori's law, 1894). They can continue for weeks, months, or even years after a mainshock, with magnitudes typically up to about 1.1 units below the mainshock (Båth's law).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q006", sectionId: "EARTH-08", topicId: "earth-h1", difficulty: "hard", type: "single",
  question: "In the stick-slip mechanism, faults:",
  options: ["Continuously slide without any buildup of stress", "Alternately store strain (stick) and release it suddenly (slip)", "Only release strain during volcanic activity", "Are limited to transform plate boundaries"],
  correctAnswer: 1,
  explanation: "Stick-slip is the cyclic process by which a fault alternately locks (sticks) while strain accumulates elastically, then slips suddenly when stress exceeds frictional strength. The cycle then repeats. This is the mechanism behind the earthquake cycle on most major faults.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q007", sectionId: "EARTH-08", topicId: "earth-h1", difficulty: "medium", type: "single",
  question: "Earthquake swarms — sequences of many small earthquakes with no clear mainshock — are commonly associated with:",
  options: ["Transform plate boundaries", "Volcanic or magmatic activity", "Deep mantle plumes only", "Mid-ocean ridges exclusively"],
  correctAnswer: 1,
  explanation: "Earthquake swarms (many small events with no clear mainshock) are typical of volcanic regions (e.g., Yellowstone, Long Valley, the Canary Islands) and zones of active fluid injection. They reflect pressure changes from magma movement or fluids rather than classic stick-slip faulting.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-h2: Seismic Waves: Body & Surface ──


{ id: "EARTH-08-Q008", sectionId: "EARTH-08", topicId: "earth-h2", difficulty: "easy", type: "single",
  question: "Which seismic wave is the FIRST to arrive at a seismograph station?",
  options: ["S-wave", "Surface wave", "P-wave", "Love wave"],
  correctAnswer: 2,
  explanation: "P-waves are the fastest seismic waves and the first to arrive at a recording station. The order of arrival is: P-wave → S-wave → Surface waves.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q009", sectionId: "EARTH-08", topicId: "earth-h2", difficulty: "medium", type: "single",
  question: "S-waves cannot pass through the outer core because:",
  options: ["They are too slow", "Liquids do not support shear stress", "The outer core is too dense", "The outer core is too cold"],
  correctAnswer: 1,
  explanation: "S-waves are shear waves — they propagate by side-to-side motion of the material. Liquids do not support shear stress (they flow instead of shearing), so S-waves cannot pass through liquids. This is the key evidence that the outer core is liquid.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q010", sectionId: "EARTH-08", topicId: "earth-h2", difficulty: "medium", type: "single",
  question: "Surface waves (Love and Rayleigh) are generally the most damaging because they are:",
  options: ["Fastest", "Highest in frequency", "Largest in amplitude and travel along the surface", "Able to pass through the outer core"],
  correctAnswer: 2,
  explanation: "Surface waves are slower than body waves but have larger amplitudes and are confined to Earth's surface. The large amplitudes and the resonance with buildings and infrastructure are why surface waves cause most of the damage in an earthquake.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q011", sectionId: "EARTH-08", topicId: "earth-h2", difficulty: "easy", type: "true_false",
  question: "The principle of superposition states that in an undisturbed sequence of sedimentary rocks, younger layers are above older layers.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Steno's law of superposition is a cornerstone of relative dating: unless overturned by later deformation, beds higher in a stack are younger. It does not by itself give absolute (numerical) ages.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q012", sectionId: "EARTH-08", topicId: "earth-h2", difficulty: "hard", type: "single",
  question: "The S-wave shadow zone (where direct S-waves do not arrive) is located between which angular distances from the epicenter?",
  options: ["0°–30°", "30°–103°", "103°–180°", "180°–360°"],
  correctAnswer: 2,
  explanation: "The S-wave shadow zone extends from 103° to 180° from the epicenter. S-waves cannot pass through the liquid outer core, so no direct S-waves arrive beyond ~103°. This shadow zone is the key evidence for a liquid outer core.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q013", sectionId: "EARTH-08", topicId: "earth-h2", difficulty: "hard", type: "single",
  question: "Love waves and Rayleigh waves are best described as:",
  options: ["Body waves that travel through Earth's interior", "Surface waves that travel along Earth's surface", "Waves that only exist during volcanic eruptions", "Waves generated only by nuclear explosions"],
  correctAnswer: 1,
  explanation: "Love and Rayleigh waves are surface waves — they travel along Earth's surface, with motion confined to the outer few tens of km. Love waves have horizontal side-to-side motion; Rayleigh waves have rolling elliptical motion like ocean waves.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q014", sectionId: "EARTH-08", topicId: "earth-h2", difficulty: "medium", type: "single",
  question: "A P-wave travels at about 6 km/s in the crust and an S-wave at about 3.5 km/s. How long will the S-wave lag behind the P-wave at a distance of 70 km?",
  options: ["~5 s", "~8 s", "~20 s", "~30 s"],
  correctAnswer: 1,
  explanation: "P-wave travel time = 70/6 ≈ 11.7 s. S-wave travel time = 70/3.5 = 20 s. Lag ≈ 20 − 11.7 ≈ 8.3 s ≈ 8 s. This P–S time difference is used when locating earthquakes.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-h3: Locating Earthquakes & Seismographs ──


{ id: "EARTH-08-Q015", sectionId: "EARTH-08", topicId: "earth-h3", difficulty: "easy", type: "single",
  question: "What is the minimum number of seismograph stations required to locate an earthquake epicenter by triangulation?",
  options: ["1", "2", "3", "5"],
  correctAnswer: 2,
  explanation: "At least 3 stations are needed. One station gives a distance (a circle on the map), two stations intersect at two possible points, and a third station resolves the ambiguity to a single point — the epicenter.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q016", sectionId: "EARTH-08", topicId: "earth-h3", difficulty: "medium", type: "single",
  question: "The P–S time interval on a seismogram is converted to a distance from the epicenter using:",
  options: ["The amplitude of the P-wave", "A pre-computed travel-time curve based on Earth's velocity structure", "The depth of the focus", "The magnitude of the earthquake"],
  correctAnswer: 1,
  explanation: "Travel-time curves are pre-computed tables or graphs that convert a P–S time delay into a distance from the epicenter. They account for the fact that seismic velocity increases with depth and the geometry of the great-circle path.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q017", sectionId: "EARTH-08", topicId: "earth-h3", difficulty: "medium", type: "true_false",
  question: "A seismograph detects ground motion; a seismogram is the record produced by the seismograph.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. The seismograph (or seismometer) is the instrument that detects ground motion. The seismogram is the actual record (paper chart or digital file) of that motion over time.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q018", sectionId: "EARTH-08", topicId: "earth-h3", difficulty: "hard", type: "single",
  question: "A modern broadband seismograph typically uses which design principle?",
  options: ["A heavy mass that moves with the ground", "A suspended mass that tends to stay at rest by inertia while the ground moves beneath it; relative motion is recorded", "A satellite-based laser rangefinder", "An acoustic microphone buried in the ground"],
  correctAnswer: 1,
  explanation: "Modern seismographs use inertia: a mass is suspended on a spring or pendulum and tends to stay at rest while the ground moves. The relative motion between the mass and the ground (or the force needed to keep the mass still) is recorded electronically. This produces a very clean record over a broad range of frequencies.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q019", sectionId: "EARTH-08", topicId: "earth-h3", difficulty: "medium", type: "single",
  question: "A 'beach-ball' focal mechanism diagram is used to show:",
  options: ["The magnitude of an earthquake", "The fault orientation and slip direction derived from P-wave first motions", "The depth of the focus", "The tsunami risk"],
  correctAnswer: 1,
  explanation: "A focal mechanism (or 'beach-ball') diagram is a graphical representation of the fault plane and slip direction, derived from the pattern of P-wave first motions recorded at many stations. The 'beaches' (shaded and unshaded quadrants) show compressional and dilatational first motions.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-h4: Magnitude, Intensity & Seismic Hazard ──


{ id: "EARTH-08-Q020", sectionId: "EARTH-08", topicId: "earth-h4", difficulty: "easy", type: "single",
  question: "The most widely used modern magnitude scale is:",
  options: ["Richter (ML)", "Moment Magnitude (Mw)", "Body-wave magnitude (mb)", "Surface-wave magnitude (Ms)"],
  correctAnswer: 1,
  explanation: "Moment Magnitude (Mw), introduced in 1979, is the modern standard. It is based on the seismic moment (a direct measure of energy released), is valid for all earthquake sizes and depths, and has no upper limit. The Richter (ML) scale, by contrast, saturates for very large events.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q021", sectionId: "EARTH-08", topicId: "earth-h4", difficulty: "medium", type: "single",
  question: "The magnitude scale is logarithmic, with each whole-number step representing approximately how much more released energy?",
  options: ["2× more energy", "10× more energy", "~32× more energy", "100× more energy"],
  correctAnswer: 2,
  explanation: "Each whole-number step on the magnitude scale represents about 32 times more released energy (and 10 times larger wave amplitude). So a M8 releases ~32× the energy of M7, ~1,000× the energy of M6, and ~32,000× the energy of M5.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q022", sectionId: "EARTH-08", topicId: "earth-h4", difficulty: "medium", type: "true_false",
  question: "Magnitude and intensity are essentially the same measure of an earthquake, just on different scales.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. Magnitude is an objective single value for the whole event (energy released). Intensity (e.g., Modified Mercalli) is a subjective measure of the shaking and damage at a specific location, and varies with distance and site conditions. A single earthquake has one magnitude but many intensities.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q023", sectionId: "EARTH-08", topicId: "earth-h4", difficulty: "hard", type: "single",
  question: "The Richter Magnitude (ML) scale is no longer preferred for large earthquakes because:",
  options: ["It is too complicated to compute", "It saturates for very large events (cannot distinguish M8.3 from M8.9)", "It does not work in oceanic settings", "It only works for shallow earthquakes"],
  correctAnswer: 1,
  explanation: "The original Richter scale was calibrated for a specific seismograph in southern California and 'saturates' (maxes out) for very large events. A M8.3 and a M8.9 might both read M8.3 on the Richter scale. The Moment Magnitude (Mw) scale, based on the seismic moment, has no such saturation.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q024", sectionId: "EARTH-08", topicId: "earth-h4", difficulty: "hard", type: "single",
  question: "The seismic moment M₀ is calculated as:",
  options: ["M₀ = log₁₀(amplitude)", "M₀ = μ × A × D (rigidity × rupture area × average slip)", "M₀ = (P-wave delay) × distance", "M₀ = (epicentral distance) / (P-wave speed)"],
  correctAnswer: 1,
  explanation: "Seismic moment M₀ = μ × A × D, where μ is the shear modulus (rigidity) of the rock, A is the rupture area on the fault, and D is the average slip. Mw = (2/3) × log₁₀(M₀) − 10.7 (in dyne-cm units).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q025", sectionId: "EARTH-08", topicId: "earth-h4", difficulty: "medium", type: "single",
  question: "On the Modified Mercalli Intensity (MMI) scale, intensity:",
  options: ["Is a single value for the whole earthquake", "Varies with distance from the epicenter and local site conditions", "Is always proportional to magnitude", "Is independent of building construction"],
  correctAnswer: 1,
  explanation: "Intensity (MMI) is a measure of the observed shaking and damage at a specific location. It varies with distance from the epicenter and with local site conditions (soft soils amplify shaking). The MMI scale runs from I (not felt) to XII (total destruction).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q026", sectionId: "EARTH-08", topicId: "earth-h4", difficulty: "hard", type: "single",
  question: "The largest earthquake ever recorded was the 1960 Valdivia event in Chile. Its Moment Magnitude was approximately:",
  options: ["M8.5", "M9.0", "M9.5", "M10.0"],
  correctAnswer: 2,
  explanation: "The 1960 Valdivia (Chile) earthquake is the largest ever recorded, with Mw ≈ 9.5. It ruptured ~1,000 km of the subduction zone and produced a Pacific-wide tsunami. There is no theoretical upper limit to Mw, but M10 would require a fault area comparable to the entire Earth.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-h5: Global Earthquake Distribution & Tsunamis ──


{ id: "EARTH-08-Q027", sectionId: "EARTH-08", topicId: "earth-h5", difficulty: "easy", type: "single",
  question: "What percentage of the world's earthquakes occur along the Pacific Ring of Fire?",
  options: ["~10%", "~30%", "~60%", "~90%"],
  correctAnswer: 3,
  explanation: "About 90% of all earthquakes occur along the Pacific Ring of Fire, the belt of subduction zones surrounding the Pacific Ocean. The Alpine-Himalayan Belt accounts for most of the remaining 5–10%.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q028", sectionId: "EARTH-08", topicId: "earth-h5", difficulty: "medium", type: "single",
  question: "A tsunami is most commonly generated by:",
  options: ["Strong winds over the ocean surface", "Sudden vertical displacement of the seafloor (e.g., undersea earthquake)", "Tidal forces from the Moon", "Volcanic eruptions on land"],
  correctAnswer: 1,
  explanation: "Most tsunamis are generated by sudden vertical displacement of the seafloor, usually from a large shallow undersea earthquake (megathrust). Submarine landslides, volcanic eruptions, and (very rarely) meteorite impacts can also cause tsunamis.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q029", sectionId: "EARTH-08", topicId: "earth-h5", difficulty: "medium", type: "single",
  question: "In the deep ocean, a tsunami wave typically has:",
  options: ["Wavelength < 10 m and speed of a few km/h", "Wavelength of hundreds of km and speed of 500–800 km/h", "Wavelength of a few km and speed of 100 km/h", "No wavelength; it is a single pulse"],
  correctAnswer: 1,
  explanation: "In the deep ocean, a tsunami has a very long wavelength (often >100 km) and travels at 500–800 km/h — about as fast as a jet plane. Its height is small (<1 m), so ships at sea usually do not notice it.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q030", sectionId: "EARTH-08", topicId: "earth-h5", difficulty: "hard", type: "single",
  question: "When a tsunami enters shallow coastal water, the wave typically:",
  options: ["Disappears due to friction", "Slows down and its height grows dramatically (shoaling)", "Becomes a single tall wave", "Reflects back to sea"],
  correctAnswer: 1,
  explanation: "In shallow water, the front of the tsunami slows due to friction with the seafloor while the back keeps moving at full speed. The water piles up, the wave slows to 30–50 km/h, and the height grows dramatically (shoaling) — sometimes tens of metres at the coast.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q031", sectionId: "EARTH-08", topicId: "earth-h5", difficulty: "medium", type: "true_false",
  question: "The 2004 Indian Ocean tsunami killed about 230,000 people across 14 countries.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. The 2004 Sumatra-Andaman earthquake (Mw 9.1) triggered a tsunami that killed approximately 230,000 people in 14 countries, including Indonesia, Sri Lanka, India, and Thailand. It was the deadliest tsunami in recorded history and led to the creation of the Indian Ocean Tsunami Warning System.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q032", sectionId: "EARTH-08", topicId: "earth-h5", difficulty: "hard", type: "single",
  question: "DART buoys in tsunami warning systems detect:",
  options: ["Seismic waves from the source earthquake", "Small pressure changes on the seafloor caused by a passing tsunami wave", "The height of waves at the coast", "Tidal cycles"],
  correctAnswer: 1,
  explanation: "DART (Deep-ocean Assessment and Reporting of Tsunamis) buoys sit on the seafloor and detect the very small pressure change caused by a passing tsunami wave. The data is relayed by satellite to the surface buoy and then to warning centres, which can confirm a tsunami within an hour of an earthquake.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q033", sectionId: "EARTH-08", topicId: "earth-h5", difficulty: "medium", type: "single",
  question: "Most earthquakes are concentrated along:",
  options: ["The centres of continents", "Plate boundaries", "Random locations", "Oceanic islands only"],
  correctAnswer: 1,
  explanation: "About 95% of earthquakes occur along plate boundaries, where the stress is concentrated. Mid-ocean ridges, subduction zones, and transform faults are the three main types of plate boundaries that produce earthquakes.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-h6: Earthquake Hazards, Risk & Mitigation ──


{ id: "EARTH-08-Q034", sectionId: "EARTH-08", topicId: "earth-h6", difficulty: "easy", type: "single",
  question: "The PRIMARY cause of damage and casualties in most earthquakes is:",
  options: ["Surface rupture along the fault", "Ground shaking", "Tsunamis", "Volcanic eruptions"],
  correctAnswer: 1,
  explanation: "Ground shaking is the primary cause of damage and casualties in most earthquakes. The collapse of buildings that did not meet modern codes is the direct cause of most deaths in urban earthquakes.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q035", sectionId: "EARTH-08", topicId: "earth-h6", difficulty: "medium", type: "single",
  question: "Liquefaction during an earthquake causes:",
  options: ["The soil to harden and become more stable", "Water-saturated sandy soils to lose strength and behave as a liquid", "Rocks to melt", "The water table to drop"],
  correctAnswer: 1,
  explanation: "Liquefaction occurs when water-saturated sandy soils lose their strength during strong shaking: the sand grains rearrange, the load transfers to the pore water, and the soil briefly behaves as a liquid. Buildings can sink, tilt, or float; buried structures can rise to the surface.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q036", sectionId: "EARTH-08", topicId: "earth-h6", difficulty: "medium", type: "single",
  question: "Base isolation in earthquake-resistant buildings works by:",
  options: ["Strengthening the foundation to bedrock", "Placing the building on flexible pads that decouple it from ground motion", "Adding heavy weights to the roof", "Reinforcing walls with steel beams"],
  correctAnswer: 1,
  explanation: "Base isolation places the building on flexible pads (often lead-rubber bearings) that decouple the structure from the horizontal ground motion. During shaking, the pads flex and the building above moves much less than the ground, dramatically reducing the forces on the structure.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q037", sectionId: "EARTH-08", topicId: "earth-h6", difficulty: "hard", type: "single",
  question: "Earthquake early warning (EEW) systems send an alert to users after detecting:",
  options: ["The first (non-damaging) P-waves, before the slower, more damaging S-waves and surface waves arrive", "The surface waves directly", "Foreshocks that occur hours before the mainshock", "The tsunami at the coast"],
  correctAnswer: 0,
  explanation: "EEW systems detect the first P-waves (which travel fast but cause little damage) and send an alert before the slower S-waves and surface waves arrive. The warning time depends on the distance to the epicenter — typically seconds to tens of seconds. This is enough for trains to slow, gas valves to close, and people to take cover.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q038", sectionId: "EARTH-08", topicId: "earth-h6", difficulty: "hard", type: "single",
  question: "The 1985 Mexico City earthquake killed thousands despite the epicenter being ~400 km away. The main reason was:",
  options: ["The earthquake was unexpectedly large (M8.0+)", "Amplification of seismic waves in soft, water-saturated lake-bed sediments under the city", "A tsunami that struck the coast", "A volcanic eruption that followed the quake"],
  correctAnswer: 1,
  explanation: "Mexico City is built on soft, water-saturated lake-bed sediments from the former Lake Texcoco. These sediments strongly amplified the seismic waves from the distant Mw 8.0 earthquake, producing shaking 5–10× stronger on the lakebed than on nearby bedrock. Buildings of 5–20 stories resonated with the amplified waves, leading to collapse.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q039", sectionId: "EARTH-08", topicId: "earth-h6", difficulty: "medium", type: "true_false",
  question: "The 1906 San Francisco earthquake caused most of its damage by fire, not by ground shaking.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. The 1906 San Francisco earthquake ruptured the San Andreas Fault, but the actual shaking damage was relatively limited. The greater damage was caused by fires that broke out from broken gas lines, electrical short circuits, and damaged firefighting infrastructure. The fires burned for days, destroying most of the city centre.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-08-Q040", sectionId: "EARTH-08", topicId: "earth-h6", difficulty: "hard", type: "single",
  question: "Which earthquake was responsible for the most deaths in the 21st century (as of the 2020s)?",
  options: ["2010 Haiti (M7.0)", "2004 Indian Ocean (M9.1) — the tsunami deaths", "2011 Tōhoku, Japan (M9.1)", "2015 Nepal (M7.8)"],
  correctAnswer: 1,
  explanation: "The 2004 Indian Ocean earthquake and tsunami killed approximately 230,000 people across 14 countries — the deadliest natural disaster of the 21st century. The 2010 Haiti earthquake killed an estimated 200,000–300,000, mostly due to building collapse. Direct earthquake shaking + tsunami makes the 2004 event the single deadliest.",
  sourceCitation: "Standard Earth science curriculum" },






// ════════════════════════════════════════════════════════════════════
// EARTH-I: Pakistan's Geology & Seismicity
// ════════════════════════════════════════════════════════════════════


// ── Topic earth-i1: Tectonic Setting of Pakistan & Major Geological Features ──


{ id: "EARTH-09-Q001", sectionId: "EARTH-09", topicId: "earth-i1", difficulty: "easy", type: "single",
  question: "Pakistan sits at the active collision zone between which two tectonic plates?",
  options: ["Arabian and Eurasian", "African and Indian", "Indian and Eurasian", "Pacific and North American"],
  correctAnswer: 2,
  explanation: "Pakistan is located at the active collision zone between the Indian Plate and the Eurasian Plate. The collision began ~50 Ma and continues today at ~3–5 cm/year, producing the Karakoram, Himalayas, and Hindu Kush mountain belts.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q002", sectionId: "EARTH-09", topicId: "earth-i1", difficulty: "easy", type: "single",
  question: "Which is the highest peak in Pakistan?",
  options: ["Nanga Parbat (8,126 m)", "Tirich Mir (7,708 m)", "K2 (8,611 m)", "Broad Peak (8,051 m)"],
  correctAnswer: 2,
  explanation: "K2 (8,611 m), located in the Karakoram range in Gilgit-Baltistan, is the highest peak in Pakistan and the second-highest in the world (after Mount Everest). Nanga Parbat is the second-highest in Pakistan.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q003", sectionId: "EARTH-09", topicId: "earth-i1", difficulty: "medium", type: "single",
  question: "Nanga Parbat is one of the fastest-rising mountains on Earth, with an uplift rate of approximately:",
  options: ["~1 mm/yr", "~7 mm/yr", "~30 mm/yr", "~100 mm/yr"],
  correctAnswer: 1,
  explanation: "Nanga Parbat (8,126 m) is rising at approximately 7 mm/year — one of the highest uplift rates on Earth. This rapid uplift is driven by active thrust faulting at the western Himalayan syntaxis.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q004", sectionId: "EARTH-09", topicId: "earth-i1", difficulty: "medium", type: "single",
  question: "The Makran coast of Balochistan is the site of:",
  options: ["A continental collision zone", "An active subduction zone (Arabian Plate beneath Eurasian Plate)", "A transform fault only", "A stable craton"],
  correctAnswer: 1,
  explanation: "The Makran coast is the site of an active subduction zone, where the Arabian Plate is subducting northward beneath the Eurasian Plate. This subduction has produced the 1945 M8.1 earthquake and tsunami, and poses a continuing hazard.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q005", sectionId: "EARTH-09", topicId: "earth-i1", difficulty: "medium", type: "true_false",
  question: "The Salt Range exposes some of the oldest rocks in South Asia, including Precambrian formations.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. The Salt Range exposes Precambrian and Cambrian rocks, including the famous Salt Range Formation (rock salt), the Khewra Sandstone (Cambrian), and the Eocene Sakesar Limestone. The Khewra Salt Mine is the second-largest in the world.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q006", sectionId: "EARTH-09", topicId: "earth-i1", difficulty: "hard", type: "single",
  question: "The Indus Basin contains sediment fill of up to:",
  options: ["500 m", "1 km", "5 km", "20 km"],
  correctAnswer: 2,
  explanation: "Drill holes in the Indus Basin have encountered more than 5 km of alluvial fill in places, making it one of the deepest alluvial basins in the world. The sediment was deposited by the Indus River and its tributaries, draining the Himalayan–Karakoram mountain belt.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-i2: Seismic Zones of Pakistan & Major Earthquakes ──


{ id: "EARTH-09-Q007", sectionId: "EARTH-09", topicId: "earth-i2", difficulty: "easy", type: "single",
  question: "The 1935 Quetta earthquake in Balochistan had an approximate magnitude of:",
  options: ["M5.5", "M6.5", "M7.7", "M9.0"],
  correctAnswer: 2,
  explanation: "The 1935 Quetta earthquake (M7.7) destroyed most of Quetta city and killed an estimated 30,000–60,000 people. It is one of the deadliest earthquakes in South Asian history.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q008", sectionId: "EARTH-09", topicId: "earth-i2", difficulty: "medium", type: "single",
  question: "The 2005 Kashmir (Muzaffarabad) earthquake had an approximate magnitude of:",
  options: ["M5.6", "M6.5", "M7.6", "M8.5"],
  correctAnswer: 2,
  explanation: "The 2005 Kashmir (Muzaffarabad) earthquake (M7.6) killed over 87,000 people, injured more than 100,000, and left 3.5 million homeless. It led to the creation of the National Disaster Management Authority (NDMA) and major reforms in building codes.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q009", sectionId: "EARTH-09", topicId: "earth-i2", difficulty: "medium", type: "true_false",
  question: "The 1945 Makran earthquake (M8.1) generated a tsunami that affected the Makran coast and Karachi.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. The 1945 Makran earthquake (M8.1) triggered a tsunami that killed several thousand people along the Makran coast and reached as far as Karachi. It remains the largest historical earthquake on the Makran Subduction Zone.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q010", sectionId: "EARTH-09", topicId: "earth-i2", difficulty: "hard", type: "single",
  question: "Which of the following is the most seismically active region of Pakistan?",
  options: ["Indus Plains", "Thar Desert", "Northern Areas (Gilgit-Baltistan, Chitral)", "Coastal Sindh"],
  correctAnswer: 2,
  explanation: "Northern Pakistan (Gilgit-Baltistan, Chitral, upper KP) is the most seismically active region, with the Hindu Kush, Karakoram, and western Himalayan fronts producing frequent shallow and intermediate-depth earthquakes.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q011", sectionId: "EARTH-09", topicId: "earth-i2", difficulty: "medium", type: "single",
  question: "The 2013 Awaran earthquake (M7.7) in Balochistan is believed to have occurred on which fault system?",
  options: ["Main Karakoram Thrust", "Chaman Fault system", "Main Central Thrust", "Salt Range Thrust"],
  correctAnswer: 1,
  explanation: "The 2013 Awaran earthquake (M7.7) occurred inland in Balochistan on a segment of the Chaman Fault system — a long left-lateral strike-slip fault that accommodates part of the relative motion between the Indian and Eurasian plates. It killed about 825 people and caused widespread damage.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q012", sectionId: "EARTH-09", topicId: "earth-i2", difficulty: "hard", type: "single",
  question: "Why does Karachi have a higher seismic risk than commonly perceived?",
  options: ["It sits directly on a transform fault", "It is within ~150 km of the Makran Subduction Zone and lies on soft, amplifying sediments", "It is in a rift valley", "It is built on volcanic rock"],
  correctAnswer: 1,
  explanation: "Karachi lies within ~150 km of the Makran Subduction Zone, which has produced M8+ events in the past. The city is also built on soft alluvial and coastal sediments that can amplify seismic waves. The 2001 Bhuj earthquake (M7.7, ~400 km south in India) caused damage in Karachi, demonstrating the risk.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-i3: Active Faults of Pakistan & Tsunami Risk ──


{ id: "EARTH-09-Q013", sectionId: "EARTH-09", topicId: "earth-i3", difficulty: "easy", type: "single",
  question: "The Chaman Fault is best described as:",
  options: ["A thrust fault in the Himalayas", "A long left-lateral strike-slip fault in Balochistan", "A subduction zone offshore", "A normal fault in the Indus Plains"],
  correctAnswer: 1,
  explanation: "The Chaman Fault is a long (>800 km) left-lateral strike-slip fault running roughly N–S through Balochistan. It accommodates the relative motion between the Indian and Eurasian plates and has produced many earthquakes, including the 1935 Quetta event.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q014", sectionId: "EARTH-09", topicId: "earth-i3", difficulty: "medium", type: "single",
  question: "The Main Boundary Thrust (MBT) separates:",
  options: ["The Siwalik Hills from older rocks to the north", "The Indian and Arabian plates", "The Indus Basin from the Thar Desert", "The inner and outer core"],
  correctAnswer: 0,
  explanation: "The Main Boundary Thrust (MBT) separates the Siwalik Hills (younger Tertiary rocks) from older sequences to the north. It is an active thrust fault responsible for many Himalayan earthquakes, including the 2005 Kashmir event.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q015", sectionId: "EARTH-09", topicId: "earth-i3", difficulty: "hard", type: "single",
  question: "Why is the Makran Subduction Zone considered particularly hazardous despite producing few recent large earthquakes?",
  options: ["Because it is a divergent boundary", "Because subduction zones can produce M8+ megathrust earthquakes and tsunamis; recurrence intervals may be long (centuries), giving a false sense of safety", "Because it has no seismic monitoring", "Because it is in the middle of a continent"],
  correctAnswer: 1,
  explanation: "The Makran Subduction Zone has produced M8+ earthquakes in the past (e.g., 1945 M8.1). The subduction rate is slow (~2 cm/year), so recurrence intervals between major events may be centuries. This can give a false sense of safety; the next event could be devastating for the Makran coast and Karachi.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q016", sectionId: "EARTH-09", topicId: "earth-i3", difficulty: "medium", type: "true_false",
  question: "Pakistan's Makran coast is the most tsunami-vulnerable region of the country.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. The Makran coast (Gwadar, Pasni, Ormara) lies directly above the Makran Subduction Zone and is the most tsunami-vulnerable region of Pakistan. Many fishing villages and the port of Gwadar are in the potential inundation zone.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q017", sectionId: "EARTH-09", topicId: "earth-i3", difficulty: "hard", type: "single",
  question: "Which is the northernmost major active thrust fault in Pakistan?",
  options: ["Main Boundary Thrust (MBT)", "Main Central Thrust (MCT)", "Main Karakoram Thrust (MKT)", "Chaman Fault"],
  correctAnswer: 2,
  explanation: "The Main Karakoram Thrust (MKT) is the northernmost major active thrust fault in Pakistan, separating the Karakoram from the western Himalayas. The MBT is further south, and the MCT lies between them.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q018", sectionId: "EARTH-09", topicId: "earth-i3", difficulty: "medium", type: "single",
  question: "The Pakistan Meteorological Department (PMD) operates a tsunami warning centre in:",
  options: ["Islamabad", "Lahore", "Karachi", "Peshawar"],
  correctAnswer: 2,
  explanation: "The National Tsunami Warning Centre of the Pakistan Meteorological Department is located in Karachi, on the country's most tsunami-vulnerable coast. It works with the IOC Indian Ocean Tsunami Warning System.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-i4: Mineral & Energy Resources of Pakistan ──


{ id: "EARTH-09-Q019", sectionId: "EARTH-09", topicId: "earth-i4", difficulty: "easy", type: "single",
  question: "The Thar Coalfield in Sindh is significant because:",
  options: ["It produces anthracite coal", "It is one of the world's largest coal deposits (~175 billion tonnes of lignite)", "It is the smallest coalfield in Pakistan", "It is located in Balochistan"],
  correctAnswer: 1,
  explanation: "The Thar Coalfield in the Thar Desert of Sindh has estimated reserves of 175 billion tonnes of lignite coal, making it one of the world's largest coalfields. The coal is shallow, amenable to open-pit mining, and could supply Pakistan's energy needs for centuries.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q020", sectionId: "EARTH-09", topicId: "earth-i4", difficulty: "easy", type: "single",
  question: "Pakistan's largest natural gas field is:",
  options: ["Sui (Balochistan)", "Mazarani (Sindh)", "Meyal (Potwar)", "Kandkot (Sindh)"],
  correctAnswer: 0,
  explanation: "The Sui Gas Field in Dera Bugti (Balochistan) is Pakistan's largest natural gas field, discovered in 1952. It still produces a major share of Pakistan's natural gas. The gas is found in Eocene and Cretaceous–Paleocene carbonates.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q021", sectionId: "EARTH-09", topicId: "earth-i4", difficulty: "easy", type: "single",
  question: "The Khewra Salt Mine, located in the Salt Range, is:",
  options: ["The smallest salt mine in Pakistan", "The world's second-largest salt mine, also the source of pink Himalayan salt", "Located in Balochistan", "A copper mine"],
  correctAnswer: 1,
  explanation: "The Khewra Salt Mine in the Salt Range (Punjab) is the world's second-largest salt mine (after a Polish mine). It has been in operation since antiquity, produces about 350,000 tonnes of salt per year, and is the source of the famous pink Himalayan salt.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q022", sectionId: "EARTH-09", topicId: "earth-i4", difficulty: "medium", type: "single",
  question: "Reko Diq, located in the Chagai Hills of Balochistan, is famous for:",
  options: ["Lignite coal", "One of the world's largest undeveloped copper-gold porphyry deposits", "Major emerald production", "Salt production"],
  correctAnswer: 1,
  explanation: "Reko Diq is one of the world's largest undeveloped copper-gold porphyry deposits, with ~5.9 billion tonnes of ore at 0.4–0.5% Cu and 0.2–0.3 g/t Au. Its development has been delayed by legal disputes and security challenges.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q023", sectionId: "EARTH-09", topicId: "earth-i4", difficulty: "medium", type: "single",
  question: "The Swat Valley in Khyber Pakhtunkhwa is famous for producing:",
  options: ["Lignite coal", "Chromite", "High-quality emeralds", "Natural gas"],
  correctAnswer: 2,
  explanation: "The Swat Valley (Mingora, Gujar Kili, Barang) is famous for producing some of the world's finest emeralds. The deposits are hosted in the suture zone between the Indian and Eurasian plates. Other northern areas (Hunza, Azad Kashmir) produce rubies; Gilgit-Baltistan produces topaz, aquamarine, and tourmaline.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-09-Q024", sectionId: "EARTH-09", topicId: "earth-i4", difficulty: "hard", type: "true_false",
  question: "The Muslim Bagh area of Balochistan is one of the world's largest chromite producers.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. The Muslim Bagh area of Balochistan hosts some of the world's largest chromite deposits. Chromite is the primary ore of chromium, used in stainless steel and other alloys.",
  sourceCitation: "Standard Earth science curriculum" },






// ════════════════════════════════════════════════════════════════════
// EARTH-J: Surface Water & Groundwater (Geological Context)
// ════════════════════════════════════════════════════════════════════


// ── Topic earth-j1: The Hydrologic Cycle (Geological Recap) ──


{ id: "EARTH-10-Q001", sectionId: "EARTH-10", topicId: "earth-j1", difficulty: "easy", type: "single",
  question: "Approximately what percentage of Earth's total water is held in the oceans?",
  options: ["~50%", "~75%", "~97%", "~99.9%"],
  correctAnswer: 2,
  explanation: "About 97% of all water on Earth is in the oceans. Only ~3% is fresh water, and most of that is locked in ice caps and glaciers. Surface fresh water (lakes, rivers) makes up less than 0.01%.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-10-Q002", sectionId: "EARTH-10", topicId: "earth-j1", difficulty: "medium", type: "single",
  question: "The hydrologic cycle is primarily driven by:",
  options: ["Tidal forces and Earth's rotation", "Solar energy and gravity", "Tectonic activity and volcanism", "Earth's magnetic field"],
  correctAnswer: 1,
  explanation: "Solar energy drives evaporation (lifting water into the atmosphere) and powers the atmospheric circulation that moves water vapour around the planet. Gravity drives precipitation, runoff, and infiltration. Tectonic and magnetic forces play no direct role in the water cycle.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-10-Q003", sectionId: "EARTH-10", topicId: "earth-j1", difficulty: "medium", type: "true_false",
  question: "Water in the atmosphere has a residence time of about 9 days, while deep groundwater can be thousands of years old.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Atmospheric water turns over very rapidly (average residence time ~9 days), while deep groundwater can have residence times of thousands to tens of thousands of years. This is why groundwater is often considered a non-renewable resource on human timescales.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-10-Q004", sectionId: "EARTH-10", topicId: "earth-j1", difficulty: "medium", type: "single",
  question: "The combined flux of water to the atmosphere from evaporation and plant transpiration is called:",
  options: ["Precipitation", "Infiltration", "Evapotranspiration", "Sublimation"],
  correctAnswer: 2,
  explanation: "Evapotranspiration = evaporation + transpiration. It is the total flux of water from the land surface (and plants) to the atmosphere. It is a key variable in hydrology, climate science, and agriculture.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-10-Q005", sectionId: "EARTH-10", topicId: "earth-j1", difficulty: "hard", type: "single",
  question: "The water cycle is best described as:",
  options: ["An open system that constantly gains water from space", "A closed system in which total water on Earth is essentially constant over human timescales", "A linear system that begins with evaporation and ends with runoff", "A system unique to Earth"],
  correctAnswer: 1,
  explanation: "The water cycle is a closed system at the global scale: the total amount of water on Earth is essentially constant over human timescales. Water is not created or destroyed — only moved between reservoirs (oceans, atmosphere, ice, groundwater, surface water).",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-j2: Groundwater: Aquifers, Water Tables & Flow ──


{ id: "EARTH-10-Q006", sectionId: "EARTH-10", topicId: "earth-j2", difficulty: "easy", type: "single",
  question: "The water table is best described as:",
  options: ["The top of the unsaturated zone", "The upper surface of the zone of saturation; below it, all pore spaces are filled with water", "The bottom of an aquifer", "A measurement of precipitation"],
  correctAnswer: 1,
  explanation: "The water table is the upper surface of the saturated zone — below it, all pore spaces in the rock or soil are filled with water; above it, voids contain a mixture of air and water (the unsaturated or vadose zone).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-10-Q007", sectionId: "EARTH-10", topicId: "earth-j2", difficulty: "medium", type: "single",
  question: "An artesian well produces water without pumping because:",
  options: ["The aquifer is unconfined", "The water is heated by a magma chamber", "The water is under pressure in a confined aquifer, and rises above the aquifer when tapped", "The water is being pushed up by a geyser"],
  correctAnswer: 2,
  explanation: "A flowing artesian well taps a confined aquifer where the water is under pressure from the hydraulic head at the recharge zone. When the well is drilled, water rises above the aquifer — sometimes all the way to the surface without pumping.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-10-Q008", sectionId: "EARTH-10", topicId: "earth-j2", difficulty: "medium", type: "single",
  question: "Which of the following best describes the difference between porosity and permeability?",
  options: ["They are the same property", "Porosity is the % of void space; permeability is the ability to transmit fluid through connected voids", "Porosity is for sand; permeability is for clay", "Porosity decreases with depth; permeability increases with depth"],
  correctAnswer: 1,
  explanation: "Porosity is the fraction of the rock's volume that is void (e.g., 20% for a sandstone). Permeability is the ability of those voids to be connected so that fluid can flow through them. A rock can have high porosity but low permeability (e.g., shale) or low porosity but high permeability (e.g., fractured granite).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-10-Q009", sectionId: "EARTH-10", topicId: "earth-j2", difficulty: "hard", type: "single",
  question: "A shale layer is best described as:",
  options: ["An aquifer (high porosity, high permeability)", "An aquitard or aquiclude (low permeability)", "A karst feature", "An igneous intrusion"],
  correctAnswer: 1,
  explanation: "Shale has high porosity (10–30%) but very low permeability, because the small pores are poorly connected. It acts as an aquitard or aquiclude, restricting groundwater flow. This is why shale is often the cap rock for confined aquifers, petroleum reservoirs, and natural gas storage.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-10-Q010", sectionId: "EARTH-10", topicId: "earth-j2", difficulty: "medium", type: "true_false",
  question: "A cone of depression is a lowering of the water table around a pumping well caused by the rate of pumping exceeding the rate of recharge.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. A cone of depression forms when a well is pumped faster than the aquifer can be recharged. The water table is drawn down around the well in a cone shape. If the cone of depression from one well intersects another's, the wells interfere and both yield less. This is a common problem in over-pumped aquifers.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-10-Q011", sectionId: "EARTH-10", topicId: "earth-j2", difficulty: "hard", type: "single",
  question: "Darcy's Law for groundwater flow states:",
  options: ["Q = P / V (pressure divided by velocity)", "Q = K × A × (h/L), where K is hydraulic conductivity, A is cross-sectional area, h is head difference, L is flow length", "Q = A × v (area times velocity, like any volumetric flow)", "F = G × m₁ × m₂ / r² (Newton's law)"],
  correctAnswer: 1,
  explanation: "Darcy's Law (1856) describes groundwater flow: Q = K × A × (h/L), where Q is volumetric discharge, K is hydraulic conductivity (depends on the rock and fluid), A is the cross-sectional area, h is the head difference, and L is the flow length. It is the foundation of quantitative hydrogeology.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-10-Q012", sectionId: "EARTH-10", topicId: "earth-j2", difficulty: "medium", type: "single",
  question: "Karst aquifers (formed in limestone) are particularly vulnerable to:",
  options: ["Frost wedging", "Contamination from surface sources, because of rapid groundwater flow through caves and conduits", "High pressure at depth", "Magnetic anomalies"],
  correctAnswer: 1,
  explanation: "Karst aquifers are highly productive but highly vulnerable. Because water flows rapidly through caves, sinkholes, and underground conduits, any contamination on the surface (e.g., agricultural runoff, sewage, industrial chemicals) can reach wells and springs quickly with little natural filtration. Karst groundwater protection requires careful land-use management above the aquifer.",
  sourceCitation: "Standard Earth science curriculum" },






// ════════════════════════════════════════════════════════════════════
// EARTH-K: Geophysics Primer
// ════════════════════════════════════════════════════════════════════


// ── Topic earth-k1: Introduction to Geophysics & Geophysical Methods ──


{ id: "EARTH-11-Q001", sectionId: "EARTH-11", topicId: "earth-k1", difficulty: "easy", type: "single",
  question: "Geophysics is best defined as:",
  options: ["The study of geology using chemistry", "The application of physics to study the Earth", "The study of geography using physics", "The application of geology to engineering"],
  correctAnswer: 1,
  explanation: "Geophysics is the application of physics to study the Earth — its structure, composition, and physical processes. It uses measurements of physical fields (seismic, gravity, magnetic, electrical, radiometric) to infer subsurface conditions without drilling.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-11-Q002", sectionId: "EARTH-11", topicId: "earth-k1", difficulty: "medium", type: "single",
  question: "Which geophysical method is the PRIMARY tool for oil and gas exploration?",
  options: ["Gravity", "Magnetic", "Seismic", "Radiometric"],
  correctAnswer: 2,
  explanation: "The seismic method (especially 3D reflection seismic) is the primary tool for oil and gas exploration. It provides the highest-resolution images of the subsurface at depths of several km, allowing geologists to map the structures (anticlines, faults, salt domes) that trap hydrocarbons.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-11-Q003", sectionId: "EARTH-11", topicId: "earth-k1", difficulty: "medium", type: "true_false",
  question: "Geophysical data are direct measurements of subsurface rocks and do not require interpretation.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. Geophysical data are INDIRECT — the raw measurements (travel times, gravity values, magnetic field strength) must be processed and inverted to produce a model of the subsurface. The model is also non-unique: many different subsurface configurations can produce the same measurements. Skilled interpretation is essential.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-11-Q004", sectionId: "EARTH-11", topicId: "earth-k1", difficulty: "medium", type: "single",
  question: "Each geophysical method exploits a specific physical property contrast. Which match is INCORRECT?",
  options: ["Seismic — contrast in elastic wave speed and density", "Gravity — contrast in density", "Magnetic — contrast in magnetic susceptibility (magnetite content)", "Radiometric — contrast in electrical resistivity"],
  correctAnswer: 3,
  explanation: "Radiometric methods measure natural gamma radiation from K, U, Th in rocks (contrast in radioactive element content) — NOT electrical resistivity. The other three matches are correct.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-k2: Seismic Method (Reflection & Refraction) ──


{ id: "EARTH-11-Q005", sectionId: "EARTH-11", topicId: "earth-k2", difficulty: "easy", type: "single",
  question: "In seismic reflection surveying, what is the main principle?",
  options: ["Waves travel along a high-velocity layer and refract back to the surface", "Waves reflect off subsurface interfaces and return to receivers at the surface", "Waves are absorbed differently by different rock types", "Waves are generated by earthquakes"],
  correctAnswer: 1,
  explanation: "In seismic reflection, waves are generated at the surface, travel downward, and reflect off subsurface interfaces (boundaries where rock properties change). The reflected waves return to receivers (geophones) at the surface. The two-way travel time gives the depth to the reflector (depth = velocity × one-way time).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-11-Q006", sectionId: "EARTH-11", topicId: "earth-k2", difficulty: "medium", type: "single",
  question: "A seismic reflector is detected at a two-way travel time of 3.0 s. If the average velocity of the overlying rocks is 2,500 m/s, what is the depth of the reflector?",
  options: ["1,500 m", "3,750 m", "7,500 m", "12,000 m"],
  correctAnswer: 1,
  explanation: "Depth = velocity × (two-way time / 2) = 2,500 × (3.0 / 2) = 2,500 × 1.5 = 3,750 m.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-11-Q007", sectionId: "EARTH-11", topicId: "earth-k2", difficulty: "medium", type: "true_false",
  question: "3D seismic surveys are the modern standard for oil and gas exploration.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. 3D seismic uses a grid of receivers and produces a 3D volume of subsurface reflectivity, which can be sliced in any direction. It is the standard for modern oil and gas exploration, providing much better spatial resolution and structural imaging than older 2D surveys.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-11-Q008", sectionId: "EARTH-11", topicId: "earth-k2", difficulty: "hard", type: "single",
  question: "4D seismic refers to:",
  options: ["Seismic in four different directions", "Repeated 3D seismic surveys over time to monitor reservoir changes (e.g., fluid movement, CO₂ injection)", "Seismic with four component waves (P, S, Love, Rayleigh)", "Seismic at four different frequencies"],
  correctAnswer: 1,
  explanation: "4D seismic is repeated 3D seismic over time. By comparing successive 3D surveys, oil companies and CCS operators can monitor how fluids move within a reservoir during production or CO₂ injection. It has been a game-changer for reservoir management.",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-k3: Gravity, Magnetic & Electrical Methods ──


{ id: "EARTH-11-Q009", sectionId: "EARTH-11", topicId: "earth-k3", difficulty: "easy", type: "single",
  question: "The gravity method measures variations in Earth's gravitational field caused by:",
  options: ["Magnetic anomalies in the subsurface", "Density contrasts in subsurface rocks", "Electrical resistivity of the rocks", "Radioactive element content"],
  correctAnswer: 1,
  explanation: "The gravity method uses gravimeters to measure small variations in Earth's gravitational field. These variations are caused by lateral contrasts in rock density: dense bodies (e.g., ore, basalt) produce positive anomalies; light bodies (e.g., salt, air-filled caves) produce negative anomalies.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-11-Q010", sectionId: "EARTH-11", topicId: "earth-k3", difficulty: "medium", type: "single",
  question: "The magnetic method is particularly useful for:",
  options: ["Measuring the age of rocks", "Locating magnetite-rich ore and mapping basement structure under sediments", "Detecting groundwater in sandstone aquifers", "Determining the depth to the Moho"],
  correctAnswer: 1,
  explanation: "The magnetic method is excellent for locating magnetite-rich ore bodies (iron ore, magnetite), mapping basement structure under sedimentary cover, and detecting basaltic intrusions. Magnetic surveys are fast and cheap, and routinely done from aircraft (aeromagnetic surveys) for regional mapping.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-11-Q011", sectionId: "EARTH-11", topicId: "earth-k3", difficulty: "medium", type: "single",
  question: "Which material has the LOWEST electrical resistivity (i.e., is the best conductor)?",
  options: ["Dry granite", "Clean sand and gravel", "Salt water", "Metallic ore"],
  correctAnswer: 3,
  explanation: "Metallic ore (e.g., sulfide ore) has the lowest resistivity of the options — typically 0.01–1 Ω·m, far below even salt water (~0.2 Ω·m). This is why electromagnetic (EM) methods are so effective for mineral exploration: conductive ore bodies stand out dramatically against resistive host rock.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-11-Q012", sectionId: "EARTH-11", topicId: "earth-k3", difficulty: "hard", type: "single",
  question: "Resistivity surveys are commonly used in groundwater exploration because:",
  options: ["Groundwater is highly radioactive", "Aquifers (sand, gravel) typically have much higher resistivity than surrounding clays and shales", "The method is only sensitive to water content", "Resistivity measures water temperature directly"],
  correctAnswer: 1,
  explanation: "Aquifer materials (clean sand and gravel, typically 100–1,000 Ω·m) have much higher resistivity than surrounding clays and shales (1–100 Ω·m). This strong contrast makes resistivity surveys excellent for locating aquifers, mapping their extent, and distinguishing fresh from salt water (salt water is very conductive, ~0.2 Ω·m).",
  sourceCitation: "Standard Earth science curriculum" },


// ── Topic earth-k4: Radiometric Methods & Geodesy ──


{ id: "EARTH-11-Q013", sectionId: "EARTH-11", topicId: "earth-k4", difficulty: "easy", type: "single",
  question: "Radiometric (gamma-ray) surveys measure the natural radioactivity of rocks from which elements?",
  options: ["Iron and manganese", "Potassium (K), Uranium (U), and Thorium (Th)", "Silicon and oxygen", "Carbon and hydrogen"],
  correctAnswer: 1,
  explanation: "Gamma-ray spectrometers measure natural radioactivity from three main sources: K-40 (a radioactive isotope of potassium), the U-238 decay series, and the Th-232 decay series. Granitic rocks are typically rich in these elements; basalts are low; sediments are variable.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-11-Q014", sectionId: "EARTH-11", topicId: "earth-k4", difficulty: "medium", type: "single",
  question: "The GPS (Global Positioning System) is used in geophysics primarily to:",
  options: ["Measure the depth of earthquakes", "Measure precise positions (and hence plate motions, ground deformation) to mm accuracy", "Image the subsurface in 3D", "Detect oil directly"],
  correctAnswer: 1,
  explanation: "GPS provides 3D position to mm-scale accuracy with long observation times. This allows geophysicists to track plate motion (a few cm/year), measure ground deformation before and after earthquakes, monitor volcanoes, and survey ground subsidence. The India–Eurasia convergence is currently measured at ~3–5 cm/year using GPS.",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-11-Q015", sectionId: "EARTH-11", topicId: "earth-k4", difficulty: "hard", type: "single",
  question: "The GRACE satellite mission measures:",
  options: ["Sea surface temperature", "Monthly changes in Earth's gravity field, used to track ice mass loss and groundwater depletion", "Atmospheric CO₂ concentrations", "Earthquake magnitudes in real time"],
  correctAnswer: 1,
  explanation: "GRACE (Gravity Recovery and Climate Experiment, 2002–2017) and its successor GRACE-FO (launched 2018) measure month-to-month variations in Earth's gravity field. The data reveal changes in mass distribution: melting ice sheets, depleting aquifers, changing ocean currents, and even the rebound of crust after glacier melt (glacial isostatic adjustment).",
  sourceCitation: "Standard Earth science curriculum" },


{ id: "EARTH-11-Q016", sectionId: "EARTH-11", topicId: "earth-k4", difficulty: "medium", type: "true_false",
  question: "Satellite altimetry has measured global sea level rise at approximately 3.4 mm/year over recent decades.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Satellite altimetry missions (TOPEX/Poseidon, Jason-1/2/3, Sentinel-6) have measured global mean sea level rise at approximately 3.4 mm/year averaged over recent decades, with significant regional variation. The rate is accelerating as ice sheets melt and oceans warm.",
  sourceCitation: "Standard Earth science curriculum" },



// ════════════════════════════════════════════════════════════════════
// ADDITIONAL QUESTIONS (expanded coverage + new formats)
// ════════════════════════════════════════════════════════════════════

// ── Extra for earth-j2: Indus Basin & Karst ──

{ id: "EARTH-10-Q013", sectionId: "EARTH-10", topicId: "earth-j2", difficulty: "medium", type: "single",
  question: "The Indus Basin aquifer system in Pakistan is best described as:",
  options: ["A crystalline basement aquifer with low yield", "A deep alluvial aquifer (locally >5 km sediment) recharged by rivers and monsoon, currently experiencing widespread water-table decline", "A confined karst aquifer with rapid conduit flow", "A volcanic aquifer limited to northern Pakistan"],
  correctAnswer: 1,
  explanation: "The Indus Basin contains one of the world's largest alluvial aquifer systems. Sediment thickness locally exceeds 5 km. Intensive irrigation pumping has caused widespread declines in the water table and, in coastal areas, saltwater intrusion.",
  sourceCitation: "Standard Earth science curriculum + Pakistan hydrology" },

{ id: "EARTH-10-Q014", sectionId: "EARTH-10", topicId: "earth-j2", difficulty: "hard", type: "single",
  question: "Why are karst aquifers particularly vulnerable to contamination?",
  options: ["They have extremely low permeability", "Rapid groundwater flow through caves and conduits provides little natural filtration", "They are always confined and under high pressure", "They contain only saline water"],
  correctAnswer: 1,
  explanation: "In karst, water travels rapidly through enlarged fractures, caves and conduits. Contaminants introduced at the surface (agricultural chemicals, sewage, industrial waste) can reach wells and springs in hours to days with minimal attenuation.",
  sourceCitation: "Standard Earth science curriculum" },

// ── Extra geophysics questions ──

{ id: "EARTH-11-Q017", sectionId: "EARTH-11", topicId: "earth-k1", difficulty: "medium", type: "single",
  question: "Which geophysical method would be most appropriate for initial reconnaissance of a large copper-gold porphyry deposit such as Reko Diq?",
  options: ["Deep seismic reflection only", "Magnetic and gravity surveys (followed by IP/resistivity)", "Radiometric surveys alone", "Satellite altimetry"],
  correctAnswer: 1,
  explanation: "Porphyry copper-gold systems often have magnetic and density contrasts associated with the intrusive complex and alteration. Magnetic and gravity surveys are efficient for regional targeting; induced polarisation (IP) and resistivity then refine targets because sulphide mineralisation produces strong chargeability responses.",
  sourceCitation: "Standard Earth science curriculum + mineral exploration practice" },

{ id: "EARTH-11-Q018", sectionId: "EARTH-11", topicId: "earth-k2", difficulty: "hard", type: "single",
  question: "A seismic reflection survey records a two-way travel time of 2.4 s to a reflector. Average velocity above the reflector is 3,000 m/s. Depth to the reflector is:",
  options: ["1,200 m", "3,600 m", "7,200 m", "14,400 m"],
  correctAnswer: 1,
  explanation: "Depth = velocity × (two-way time / 2) = 3,000 m/s × (2.4 s / 2) = 3,000 × 1.2 = 3,600 m.",
  sourceCitation: "Standard Earth science curriculum" },

{ id: "EARTH-11-Q019", sectionId: "EARTH-11", topicId: "earth-k3", difficulty: "medium", type: "true_false",
  question: "A positive gravity anomaly is produced by a dense body (e.g., ore deposit or basalt intrusion) relative to surrounding rock.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Dense bodies increase the local gravitational attraction, producing a positive gravity anomaly. Light bodies (salt, air-filled caves) produce negative anomalies.",
  sourceCitation: "Standard Earth science curriculum" },

// ── Match-the-following style (implemented as single-choice with paired options) ──

{ id: "EARTH-08-Q041", sectionId: "EARTH-08", topicId: "earth-h2", difficulty: "hard", type: "single",
  question: "Match the seismic wave with its characteristic: (1) P-wave (2) S-wave (3) Love wave (4) Rayleigh wave — which pairing is correct?",
  options: [
    "1=shear only, 2=compressional, 3=rolling surface, 4=horizontal surface",
    "1=compressional (solids+liquids), 2=shear (solids only), 3=horizontal surface shear, 4=rolling elliptical surface",
    "1=surface only, 2=body only, 3=P-wave shadow, 4=S-wave shadow",
    "1=slowest, 2=fastest, 3=Love, 4=Rayleigh"
  ],
  correctAnswer: 1,
  explanation: "P-waves are compressional and travel through solids and liquids; S-waves are shear and travel only through solids; Love waves are horizontal surface shear; Rayleigh waves produce rolling elliptical motion at the surface.",
  sourceCitation: "Standard Earth science curriculum" },

// ── Assertion-Reason style ──

{ id: "EARTH-01-Q043", sectionId: "EARTH-01", topicId: "earth-a3", difficulty: "hard", type: "single",
  question: "Assertion (A): S-waves do not pass through the outer core. Reason (R): The outer core is liquid and cannot support shear stress. Choose the correct option:",
  options: [
    "Both A and R are true and R is the correct explanation of A",
    "Both A and R are true but R is not the correct explanation of A",
    "A is true but R is false",
    "A is false but R is true"
  ],
  correctAnswer: 0,
  explanation: "Both statements are true and R correctly explains A. S-waves require a solid medium that can support shear; liquids cannot, so the S-wave shadow zone is direct evidence that the outer core is liquid.",
  sourceCitation: "Standard Earth science curriculum" },

{ id: "EARTH-04-Q030", sectionId: "EARTH-04", topicId: "earth-d3", difficulty: "hard", type: "single",
  question: "Assertion (A): Continent–continent collisions produce high fold mountains but little volcanism. Reason (R): Both plates are buoyant continental lithosphere that cannot readily subduct to the depths required for flux melting. Choose the correct option:",
  options: [
    "Both A and R are true and R is the correct explanation of A",
    "Both A and R are true but R is not the correct explanation of A",
    "A is true but R is false",
    "A is false but R is true"
  ],
  correctAnswer: 0,
  explanation: "Both A and R are true; R is the correct explanation. Without deep subduction of oceanic lithosphere there is no significant release of volatiles to trigger melting of the mantle wedge, hence minimal volcanism (Himalayas, Alps).",
  sourceCitation: "Standard Earth science curriculum" },

{ id: "EARTH-09-Q025", sectionId: "EARTH-09", topicId: "earth-i2", difficulty: "medium", type: "single",
  question: "Which statement about the 2005 Kashmir (Muzaffarabad) earthquake is correct?",
  options: [
    "It was M8.1 and generated a major tsunami",
    "It was M7.6, killed approximately 87,000+ people, and led to major reforms in disaster management and building codes in Pakistan",
    "It occurred on the Makran Subduction Zone",
    "It was the largest earthquake ever recorded in Pakistan"
  ],
  correctAnswer: 1,
  explanation: "The 2005 Kashmir earthquake was Mw 7.6, killed ~87,000+ (mostly in Pakistan), and prompted creation of the NDMA and stricter building-code enforcement. The 1945 Makran event was larger (M8.1) and generated a tsunami; the 1935 Quetta event was also highly destructive.",
  sourceCitation: "Standard Earth science curriculum + historical records" },

];

export default questions;
