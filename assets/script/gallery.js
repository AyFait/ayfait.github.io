(function () {
  const sectionSources = [
    {
      folderName: "AirVolt Development",
      folderPath: "gallery/3. airvolt development",
      files: [
        "1. Introducing the team to FRP.jpg",
        "2. Highlighthing the composoition of FRP.jpg",
        "3. Testing out some mixtures with the team.JPG",
        "4 Testing out some mixtures with the team.jpg",
        "5. The 3D printed mold for the blades.jpg",
        "6. Pattern for the fiberglass.jpg",
        "7. Fiberglass cut into desired shapes.jpg",
        "8. Sizing the fiberglass on the mold.jpg",
        "9. Measuring the resin and catalyst.jpg",
        "10. Applying resin on mold.JPG",
        "11. Placing fiberglass on mold.JPG",
        "12. Assembling.JPG",
        "13. Fixing the gearbox.JPG",
        "14. Running tests.JPG",
        "15. Desired output.JPG",
        "16. Good to go.JPG",
        "17. Up for showcase.JPG"
      ]
    },
    { folderName: "5. Applied CFD", folderPath: "gallery/2. online course certifications", files: ["5. Applied CFD Feb 2026.png"] },
    { folderName: "4. Intro to 3D Printing with Metals", folderPath: "gallery/2. online course certifications", files: ["4. Intro to 3D Printing with Metals Dec 2025.png"] },
    { folderName: "3. FEM - Linear - Nonlinear Analysis & PostProcessing", folderPath: "gallery/2. online course certifications", files: ["3. FEM - Linear - Nonlinear Analysis & PostProcessing Sep 2025.png"] },
    {
      folderName: "2. AM Specialization",
      folderPath: "gallery/2. online course certifications/2. AM Specialization",
      files: [
        "0. Specialization AM Nov 2024.png",
        "1. Intro to Additive Manufacturing Processes Oct 2024.png",
        "2. Material Extrusion Nov 2024.png",
        "3. Material Jetting and Stereolithography Nov 2024.png",
        "4. Selective Laser Sintering and Metal Laser Powder Bed Fusion Nov 2024.png",
        "5. Design for Additive Manufacturing Nov 2024.png"
      ]
    },
    {
      folderName: "1. ML Specialization",
      folderPath: "gallery/2. online course certifications/1. ML Specialization",
      files: [
        "0. Specialization ML Jan 2025.png",
        "1. Supervised Machine Learning  - Regression and Classification Jul 2024.png",
        "2. Adv Learning Algorithms Jan 2025.png",
        "3. Unsupervised Learning - Recommenders - Reinforcement Learning Aug 2024.png"
      ]
    }
  ];

  const monthMap = {
    Jan: "January", Feb: "February", Mar: "March", Apr: "April", Jun: "June", Jul: "July",
    Aug: "August", Sep: "September", Sept: "September", Oct: "October", Nov: "November", Dec: "December"
  };

  const toOrder = function (text) {
    const match = text.match(/^(\d+)/);
    return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
  };

  const normalizeText = function (text) {
    return text
      .replace(/\bAM\b/g, "Additive Manufacturing")
      .replace(/\bML\b/g, "Machine Learning")
      .replace(/\bIntro\b/g, "Introduction")
      .replace(/\bAdv\b/g, "Advanced")
      .replace(/\bCFD\b/g, "Computational Fluid Dynamics")
      .replace(/\bFEM\b/g, "Finite Element Method")
      .replace(/PostProcessing/g, "Post Processing")
      .replace(/\s*\-\s*/g, " - ")
      .replace(/\s{2,}/g, " ")
      .trim();
  };

  const expandMonths = function (text) {
    return text.replace(/\b(Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\b/g, function (match) {
      return monthMap[match] || match;
    });
  };

  const headingFromFolder = function (folderName) {
    return normalizeText(folderName.replace(/^\d+\.\s*/, "").trim());
  };

  const titleFromName = function (filename) {
    let title = filename.replace(/^\d+\.\s*/, "").replace(/\.[^.]+$/, "").trim();
    title = expandMonths(normalizeText(title));
    return title.replace(
      /\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})$/,
      " Completion Certificate $1 $2"
    );
  };

  const sections = sectionSources.slice().sort(function (a, b) {
    return toOrder(b.folderName) - toOrder(a.folderName);
  });

  const root = document.getElementById("gallery-root");
  const modal = document.getElementById("gallery-modal");
  const modalTitle = document.getElementById("gallery-modal-title");
  const closeBtn = document.getElementById("gallery-close");
  const prevBtn = document.getElementById("gallery-prev");
  const nextBtn = document.getElementById("gallery-next");
  const figure = document.getElementById("gallery-figure");
  const frame = document.getElementById("gallery-frame");
  const image = document.getElementById("gallery-image");
  const caption = document.getElementById("gallery-caption");

  if (!root || !modal || !modalTitle || !closeBtn || !prevBtn || !nextBtn || !figure || !frame || !image || !caption) {
    return;
  }

  let activeSection = null;
  let currentIndex = 0;
  let touchStartX = null;

  const updateModal = function (direction, animate) {
    const orderedFiles = activeSection.orderedFiles;
    const filename = orderedFiles[currentIndex];
    image.src = encodeURI(activeSection.folderPath + "/" + filename);
    image.alt = titleFromName(filename);
    caption.textContent = titleFromName(filename);

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === orderedFiles.length - 1;

    prevBtn.classList.toggle("hidden", orderedFiles.length === 1);
    nextBtn.classList.toggle("hidden", orderedFiles.length === 1);

    if (animate) {
      figure.classList.remove("anim-left", "anim-right");
      void figure.offsetWidth;
      figure.classList.add(direction > 0 ? "anim-right" : "anim-left");
    }
  };

  const openModal = function (sectionData) {
    activeSection = sectionData;
    currentIndex = 0;
    modalTitle.textContent = headingFromFolder(sectionData.folderName);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    updateModal(0, false);
  };

  const closeModal = function () {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  sections.forEach(function (sectionData) {
    const orderedFiles = sectionData.files.slice().sort(function (a, b) {
      return toOrder(a) - toOrder(b);
    });
    if (!orderedFiles.length) return;

    const item = document.createElement("section");
    item.className = "gallery-item";

    const summary = document.createElement("button");
    summary.className = "gallery-summary";
    summary.type = "button";

    const summaryThumb = document.createElement("img");
    summaryThumb.className = "gallery-thumb";
    summaryThumb.src = encodeURI(sectionData.folderPath + "/" + orderedFiles[0]);
    summaryThumb.alt = headingFromFolder(sectionData.folderName);

    const summaryTitle = document.createElement("span");
    summaryTitle.className = "gallery-summary-title";
    summaryTitle.textContent = headingFromFolder(sectionData.folderName);

    const summaryCaret = document.createElement("span");
    summaryCaret.className = "gallery-summary-caret";
    summaryCaret.textContent = ">";

    summary.appendChild(summaryThumb);
    summary.appendChild(summaryTitle);
    summary.appendChild(summaryCaret);
    item.appendChild(summary);
    root.appendChild(item);

    summary.addEventListener("click", function () {
      openModal({ folderName: sectionData.folderName, folderPath: sectionData.folderPath, orderedFiles: orderedFiles });
    });
  });

  prevBtn.addEventListener("click", function () {
    if (activeSection && currentIndex > 0) {
      currentIndex -= 1;
      updateModal(-1, true);
    }
  });

  nextBtn.addEventListener("click", function () {
    if (activeSection && currentIndex < activeSection.orderedFiles.length - 1) {
      currentIndex += 1;
      updateModal(1, true);
    }
  });

  frame.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].clientX;
  });

  frame.addEventListener("touchend", function (event) {
    if (!activeSection || touchStartX === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(deltaX) < 35) return;

    if (deltaX > 0 && currentIndex > 0) {
      currentIndex -= 1;
      updateModal(-1, true);
    } else if (deltaX < 0 && currentIndex < activeSection.orderedFiles.length - 1) {
      currentIndex += 1;
      updateModal(1, true);
    }
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", function (event) {
    if (!modal.classList.contains("open")) return;
    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft" && !prevBtn.disabled) prevBtn.click();
    if (event.key === "ArrowRight" && !nextBtn.disabled) nextBtn.click();
  });
})();
