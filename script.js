const projects = [
  {
    title: "아무개씨의 만물장터 | Pop-up Store Design",
    year: "2026",
    details: "Pop-up store, graphic design, brand identity, branding, poster",
    description:
      "아무개씨의 만물장터를 위한 팝업 스토어 디자인 프로젝트입니다. 브랜드 경험을 공간, 그래픽, 포스터, 이미지 시스템으로 확장한 작업입니다.",
    source: "https://gangduchi.works/pop-up-store-design",
    images: [
      "images/amg_1.jpg",
      "images/amg_2.gif",
      "images/amg_3.jpg",
      "images/amg_4.gif",
      "images/amg_5.jpg",
      "images/amg_6.gif",
      "images/amg_7.jpg",
    ],
  },
  {
    title: "움직이는 포스터 실험",
    year: "2026",
    details: "모션 그래픽, 포스터, 웹",
    description:
      "정지된 포스터의 질서를 화면 위에서 다시 배열하며 움직임의 리듬을 관찰한 프로젝트입니다.",
  },
  {
    title: "사운드 아카이브 리서치",
    year: "2025",
    details: "리서치, 편집 디자인, 웹 아카이브",
    description:
      "소리의 기록 방식을 시각 언어로 번역하고, 여러 개의 짧은 항목으로 엮은 아카이브입니다.",
  },
  {
    title: "작은 전시를 위한 그래픽",
    year: "2025",
    details: "전시 그래픽, 인쇄물, 안내 체계",
    description:
      "전시 공간 안에서 관객의 동선을 방해하지 않으면서도 또렷하게 남는 그래픽 시스템을 만들었습니다.",
  },
  {
    title: "타입과 장면의 기록",
    year: "2024",
    details: "타이포그래피, 사진, 책",
    description:
      "도시의 장면에서 발견한 글자들을 모아 하나의 느슨한 책 구조로 편집한 작업입니다.",
  },
];

const overlay = document.querySelector(".project-overlay");
const overlayMeta = document.querySelector(".project-meta");
const grid = document.querySelector(".project-grid");
const homeButton = document.querySelector(".home-link");
const projectButtons = document.querySelectorAll(".project-link");
const introText = document.querySelector(".intro p");

function typeIntro() {
  if (!introText) {
    return;
  }

  const text = introText.textContent.trim().replace(/\s+/g, " ");
  introText.textContent = "";
  introText.setAttribute("aria-label", text);

  let index = 0;
  const typing = window.setInterval(() => {
    introText.textContent += text[index];
    index += 1;

    if (index >= text.length) {
      window.clearInterval(typing);
    }
  }, 35);
}

function createProjectView(project) {
  overlayMeta.textContent = `${project.title}, ${project.year}`;

  if (project.images) {
    const imageCards = project.images
      .slice(1)
      .map(
        (image, index) => `
          <article class="project-card visual">
            <img class="project-image" src="${image}" alt="${project.title} 이미지 ${index + 2}">
          </article>
        `,
      )
      .join("");

    grid.innerHTML = `
      <article class="project-card visual main-visual">
        <img class="project-image" src="${project.images[0]}" alt="${project.title} 메인 이미지">
      </article>
      <article class="project-card text-card">
        <p>${project.title}</p>
        <p>${project.details}</p>
        <p>Project year : ${project.year}</p>
        <p><a href="${project.source}" target="_blank" rel="noreferrer">Original project page</a></p>
      </article>
      <article class="project-card text-card">
        <p>${project.description}</p>
      </article>
      ${imageCards}
    `;
    return;
  }

  grid.innerHTML = `
    <article class="project-card visual">
      <div class="image-placeholder" aria-label="${project.title} 메인 이미지 자리"></div>
    </article>
    <article class="project-card text-card">
      <p>${project.title}</p>
      <p>${project.details}</p>
    </article>
    <article class="project-card text-card">
      <p>${project.description}</p>
    </article>
    <article class="project-card visual">
      <div class="image-placeholder" aria-label="${project.title} 서브 이미지 자리"></div>
    </article>
    <article class="project-card visual">
      <div class="image-placeholder" aria-label="${project.title} 서브 이미지 자리"></div>
    </article>
    <article class="project-card text-card">
      <p>더미 텍스트 박스입니다. 실제 이미지, 캡션, 크레딧, 제작 노트로 교체할 수 있습니다.</p>
    </article>
  `;
}

function openProject(index) {
  createProjectView(projects[index]);
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("overlay-open");
  homeButton.focus();
}

function closeProject() {
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overlay-open");
}

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openProject(Number(button.dataset.project));
  });
});

homeButton.addEventListener("click", closeProject);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && overlay.classList.contains("is-open")) {
    closeProject();
  }
});

typeIntro();
