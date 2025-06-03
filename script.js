document.addEventListener("DOMContentLoaded", () => {
  const accessPlatformBtn = document.getElementById("accessPlatformBtn");
  const scheduleCollectionBtnHero = document.getElementById(
    "scheduleCollectionBtnHero"
  );
  const registerUserBtn = document.getElementById("registerUserBtn");
  const scheduleCollectionBtn = document.getElementById(
    "scheduleCollectionBtn"
  );
  const addIrregularPointBtn = document.getElementById("addIrregularPointBtn");
  const addCooperativeBtn = document.getElementById("addCooperativeBtn");

  const userModal = document.getElementById("userModal");
  const collectionModal = document.getElementById("collectionModal");

  const userFormContainer = document.getElementById("userFormContainer");
  const registerForm = document.getElementById("registerForm");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const welcomeText = document.getElementById("welcomeText");
  const modalUserPointsEl = document.getElementById("modalUserPoints");
  const logoutBtn = document.getElementById("logoutBtn");

  const collectionForm = document.getElementById("collectionForm");
  const userPointsEl = document.getElementById("userPoints");

  const statsActiveUsersEl = document.getElementById("statsActiveUsers");
  const statsWasteRecycledEl = document.getElementById("statsWasteRecycled");
  const statsPartnerCooperativesEl = document.getElementById(
    "statsPartnerCooperatives"
  );

  const impactReductionIrregularEl = document.getElementById(
    "impactReductionIrregular"
  );
  const impactCollectorIncomeEl = document.getElementById(
    "impactCollectorIncome"
  );
  const impactAwarenessEl = document.getElementById("impactAwareness");

  const mapMarkersGroup = document.getElementById("mapMarkersGroup");
  const interactiveMapSVG = document.getElementById("interactiveMapSVG");

  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

  const USERS_KEY = "ecoColetaUsers";
  const CURRENT_USER_KEY = "ecoColetaCurrentUserEmail";
  const COLLECTIONS_KEY = "ecoColetaCollections";
  const MAP_POINTS_KEY = "ecoColetaMapPoints";

  function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function getCurrentUser() {
    const email = localStorage.getItem(CURRENT_USER_KEY);
    if (!email) return null;
    const users = getData(USERS_KEY);
    return users.find((user) => user.email === email);
  }

  function setCurrentUser(email) {
    if (email) {
      localStorage.setItem(CURRENT_USER_KEY, email);
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }

  function openModal(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.style.display = "block";
      if (modalId === "userModal") {
        updateUserModalUI();
      }
    }
  }

  function closeModal(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.style.display = "none";
    }
  }

  document.querySelectorAll(".close-button").forEach((button) => {
    button.onclick = function () {
      closeModal(this.dataset.modalId);
    };
  });

  window.onclick = function (event) {
    if (event.target.classList.contains("modal")) {
      closeModal(event.target.id);
    }
  };

  function updateUserModalUI() {
    const currentUser = getCurrentUser();
    if (currentUser) {
      userFormContainer.classList.add("hidden");
      welcomeMessage.classList.remove("hidden");
      welcomeText.textContent = `Bem-vindo(a) de volta, ${currentUser.name}!`;
      modalUserPointsEl.textContent = currentUser.points;
      document.getElementById("userModalTitle").textContent = "Minha Conta";
    } else {
      userFormContainer.classList.remove("hidden");
      welcomeMessage.classList.add("hidden");
      document.getElementById("userModalTitle").textContent =
        "Acessar Plataforma";
    }
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = e.target.userName.value;
      const email = e.target.userEmail.value.trim().toLowerCase();

      if (!name || !email) {
        alert("Por favor, preencha nome e email.");
        return;
      }

      let users = getData(USERS_KEY);
      let user = users.find((u) => u.email === email);

      if (user) {
        alert(`Bem-vindo(a) de volta, ${user.name}!`);
      } else {
        user = { id: Date.now(), name, email, points: 0 };
        users.push(user);
        saveData(USERS_KEY, users);
        alert("Cadastro realizado com sucesso!");
      }
      setCurrentUser(email);
      updateUserModalUI();
      updateMainUI();
      e.target.reset();
    });
  }
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logoutUser();
    });
  }

  function logoutUser() {
    setCurrentUser(null);
    updateUserModalUI();
    updateMainUI();
    alert("Você saiu da plataforma.");
  }

  function awardPointsToCurrentUser(amount) {
    const currentUserEmail = localStorage.getItem(CURRENT_USER_KEY);
    if (!currentUserEmail) return;

    let users = getData(USERS_KEY);
    const userIndex = users.findIndex((u) => u.email === currentUserEmail);
    if (userIndex > -1) {
      users[userIndex].points += amount;
      saveData(USERS_KEY, users);
      updateMainUI();
      updateUserModalUI();
    }
  }

  if (collectionForm) {
    collectionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const currentUser = getCurrentUser();
      if (!currentUser) {
        alert("Por favor, faça login para agendar uma coleta.");
        openModal("userModal");
        return;
      }

      const materialType = e.target.materialType.value;
      const address = e.target.collectionAddress.value;
      const dateTime = e.target.collectionDate.value;
      const quantity = parseInt(e.target.collectionQuantity.value, 10);

      if (!materialType || !address || !dateTime || !quantity || quantity < 1) {
        alert(
          "Por favor, preencha todos os campos do agendamento corretamente."
        );
        return;
      }

      const collections = getData(COLLECTIONS_KEY);
      const newCollection = {
        id: Date.now(),
        userId: currentUser.id,
        userEmail: currentUser.email,
        userName: currentUser.name,
        materialType,
        address,
        dateTime,
        quantity,
        status: "Agendada",
        mapX: Math.random() * 500 + 50,
        mapY: Math.random() * 300 + 50,
      };
      collections.push(newCollection);
      saveData(COLLECTIONS_KEY, collections);

      awardPointsToCurrentUser(10 * quantity);

      alert(
        `Coleta agendada com sucesso! Você ganhou ${10 * quantity} pontos.`
      );
      closeModal("collectionModal");
      updateMainUI();
      e.target.reset();
    });
  }

  function renderMapMarkers() {
    if (!mapMarkersGroup) return;
    mapMarkersGroup.innerHTML = "";
    const collections = getData(COLLECTIONS_KEY);
    const mapPoints = getData(MAP_POINTS_KEY);

    collections.forEach((collection) => {
      addMarkerToSVG(
        collection.mapX,
        collection.mapY,
        "recycling",
        `Coleta Agendada: ${collection.materialType} por ${
          collection.userName
        }\nEnd: ${collection.address}\nData: ${new Date(
          collection.dateTime
        ).toLocaleString()}\nQtde: ${collection.quantity}kg`,
        collection.id,
        "collection"
      );
    });

    mapPoints.forEach((point) => {
      let typeClass = "";
      let titlePrefix = "";
      if (point.type === "irregular") {
        typeClass = "irregular";
        titlePrefix = "Descarte Irregular";
      } else if (point.type === "cooperative") {
        typeClass = "cooperative";
        titlePrefix = "Cooperativa";
      }
      addMarkerToSVG(
        point.mapX,
        point.mapY,
        typeClass,
        `${titlePrefix}: ${point.description}`,
        point.id,
        point.type
      );
    });
  }

  function addMarkerToSVG(cx, cy, typeClass, titleText, dataId, dataType) {
    const marker = document.createElementNS(SVG_NAMESPACE, "circle");
    marker.setAttribute("cx", cx);
    marker.setAttribute("cy", cy);
    marker.setAttribute("r", "8");
    marker.setAttribute("class", `map-marker ${typeClass}`);
    marker.setAttribute("data-id", dataId);
    marker.setAttribute("data-type", dataType);

    const title = document.createElementNS(SVG_NAMESPACE, "title");
    title.textContent = titleText;
    marker.appendChild(title);

    mapMarkersGroup.appendChild(marker);
  }

  if (addIrregularPointBtn) {
    addIrregularPointBtn.addEventListener("click", () => {
      handleAddMapPoint(
        "irregular",
        "Descreva o ponto de descarte irregular (ex: Sofá abandonado na esquina X):",
        5
      );
    });
  }

  if (addCooperativeBtn) {
    addCooperativeBtn.addEventListener("click", () => {
      handleAddMapPoint("cooperative", "Nome e endereço da cooperativa:", 0);
    });
  }

  function handleAddMapPoint(type, promptMessage, pointsAwarded) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      alert("Por favor, faça login para adicionar um ponto.");
      openModal("userModal");
      return;
    }
    const description = prompt(promptMessage);
    if (description) {
      const mapPoints = getData(MAP_POINTS_KEY);
      const newPoint = {
        id: Date.now(),
        userEmail: currentUser.email,
        type: type,
        description,
        mapX: Math.random() * 500 + 50,
        mapY: Math.random() * 300 + 50,
      };
      mapPoints.push(newPoint);
      saveData(MAP_POINTS_KEY, mapPoints);

      if (pointsAwarded > 0) {
        awardPointsToCurrentUser(pointsAwarded);
        alert(
          `Ponto do tipo "${type}" adicionado! Você ganhou ${pointsAwarded} pontos.`
        );
      } else {
        alert(`Ponto do tipo "${type}" adicionado com sucesso.`);
      }
      updateMainUI();
    }
  }

  if (interactiveMapSVG) {
    interactiveMapSVG.addEventListener("click", (event) => {
      if (
        event.target.tagName === "circle" &&
        event.target.classList.contains("map-marker")
      ) {
        const pointId = event.target.getAttribute("data-id");
        const pointType = event.target.getAttribute("data-type");
        let item;
        let alertMessage = "Detalhes não encontrados.";

        if (pointType === "collection") {
          item = getData(COLLECTIONS_KEY).find((c) => c.id == pointId);
          if (item)
            alertMessage = `Detalhes da Coleta:\nMaterial: ${
              item.materialType
            }\nEndereço: ${item.address}\nData: ${new Date(
              item.dateTime
            ).toLocaleString()}\nStatus: ${item.status}\nAgendado por: ${
              item.userName
            }`;
        } else {
          item = getData(MAP_POINTS_KEY).find((p) => p.id == pointId);
          if (item)
            alertMessage = `Detalhes do Ponto:\nTipo: ${item.type}\nDescrição: ${item.description}`;
        }
        alert(alertMessage);
      }
    });
  }

  function updateMainUI() {
    const currentUser = getCurrentUser();
    const users = getData(USERS_KEY);
    const collections = getData(COLLECTIONS_KEY);

    if (userPointsEl) {
      userPointsEl.textContent = currentUser ? currentUser.points : "0";
    }

    if (statsActiveUsersEl) statsActiveUsersEl.textContent = `${users.length}+`;
    const totalRecycled = collections.reduce(
      (sum, coll) => sum + (coll.quantity || 0),
      0
    );
    if (statsWasteRecycledEl)
      statsWasteRecycledEl.textContent = `${totalRecycled} kg`;
    if (statsPartnerCooperativesEl)
      statsPartnerCooperativesEl.textContent = `${
        mapPoints.filter((p) => p.type === "cooperative").length
      }`;

    if (impactReductionIrregularEl)
      impactReductionIrregularEl.textContent = `${Math.min(
        100,
        collections.length * 5
      )}%`;
    if (impactCollectorIncomeEl)
      impactCollectorIncomeEl.textContent = `${Math.min(
        100,
        totalRecycled * 0.2
      )}%`;
    if (impactAwarenessEl)
      impactAwarenessEl.textContent = `${Math.min(100, users.length * 10)}%`;

    renderMapMarkers();
  }

  function initializeApp() {
    if (!localStorage.getItem(USERS_KEY)) saveData(USERS_KEY, []);
    if (!localStorage.getItem(COLLECTIONS_KEY)) saveData(COLLECTIONS_KEY, []);
    if (!localStorage.getItem(MAP_POINTS_KEY)) saveData(MAP_POINTS_KEY, []);

    updateUserModalUI();
    updateMainUI();
  }

  if (accessPlatformBtn)
    accessPlatformBtn.addEventListener("click", () => openModal("userModal"));

  if (scheduleCollectionBtnHero) {
    scheduleCollectionBtnHero.addEventListener("click", () => {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        alert("Por favor, faça login primeiro.");
        openModal("userModal");
        return;
      }
      openModal("collectionModal");
    });
  }
  if (registerUserBtn)
    registerUserBtn.addEventListener("click", () => openModal("userModal"));

  if (scheduleCollectionBtn) {
    scheduleCollectionBtn.addEventListener("click", () => {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        alert("Por favor, faça login primeiro.");
        openModal("userModal");
        return;
      }
      openModal("collectionModal");
    });
  }

  initializeApp();
});
