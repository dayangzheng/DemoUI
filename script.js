(function () {
  const LIBRARY_GROUPS = [
    {
      id: "business",
      name: "业务资料",
      description: "面向销售和客户的产品、方案资料集合。",
      libraries: [
        {
          id: "product-handbook",
          name: "产品手册库",
          description: "产品介绍、规格与 FAQ 文档，帮助团队快速了解产品亮点。",
          tags: ["产品", "市场传播"],
          recommended: true,
          defaultSelected: true,
          documents: 1287,
          updated: "2024-05-12",
          owner: "产品市场部",
          info: "包含标准产品介绍、功能矩阵、竞品对比等销售必备资料。",
        },
        {
          id: "solution-blueprint",
          name: "解决方案蓝图",
          description: "按行业整理的解决方案、架构图与落地案例模板。",
          tags: ["行业方案", "演示材料"],
          recommended: true,
          defaultSelected: true,
          documents: 842,
          updated: "2024-04-28",
          owner: "行业解决方案组",
          info: "覆盖金融、制造、政企等 12 个行业的参考方案，可直接用于客户演示。",
        },
        {
          id: "customer-story",
          name: "客户案例库",
          description: "沉淀的客户成功案例、合同附件以及实施复盘文档。",
          tags: ["客户成功", "复盘"],
          recommended: false,
          defaultSelected: false,
          documents: 563,
          updated: "2024-03-30",
          owner: "客户成功团队",
          info: "包含典型客户的实施背景、成果指标及可复用的复盘模板。",
        },
        {
          id: "pricing-hub",
          name: "价格与合同资料库",
          description: "报价单模板、合同范本及审批记录集中归档。",
          tags: ["报价", "合同"],
          recommended: false,
          defaultSelected: false,
          documents: 312,
          updated: "2024-05-20",
          owner: "商务管理部",
          info: "提供最新的价格策略、折扣政策与标准合同文本。",
          fresh: true,
        },
      ],
    },
    {
      id: "knowledge",
      name: "知识学习",
      description: "产品培训、学习资料以及常见问题沉淀。",
      libraries: [
        {
          id: "training-center",
          name: "培训课程库",
          description: "线下培训课件、录播视频提炼稿以及考试题库。",
          tags: ["培训", "学习路径"],
          recommended: true,
          defaultSelected: true,
          documents: 658,
          updated: "2024-05-01",
          owner: "学习发展中心",
          info: "覆盖新员工入职、产品进阶到专家认证的完整培训材料。",
        },
        {
          id: "release-notes",
          name: "版本更新说明",
          description: "每次版本发布的更新日志、变更说明与兼容性指引。",
          tags: ["更新日志", "产品迭代"],
          recommended: true,
          defaultSelected: true,
          documents: 242,
          updated: "2024-05-21",
          owner: "研发项目管理办",
          info: "同步产品近期版本变化，含升级须知与回滚方案。",
          fresh: true,
        },
        {
          id: "knowledge-qa",
          name: "知识问答库",
          description: "常见问题、专家解答与社区讨论精选。",
          tags: ["FAQ", "即时解答"],
          recommended: false,
          defaultSelected: false,
          documents: 1194,
          updated: "2024-05-16",
          owner: "客服支持部",
          info: "围绕产品使用、部署、集成的高频问题，附最佳实践。",
        },
        {
          id: "live-webinar",
          name: "直播与宣讲资料",
          description: "直播回放摘要、宣讲稿与互动问答沉淀。",
          tags: ["直播", "宣讲"],
          recommended: false,
          defaultSelected: false,
          documents: 188,
          updated: "2024-04-10",
          owner: "品牌传播组",
          info: "便于复用的直播宣讲资料，含重点问题整理。",
        },
      ],
    },
    {
      id: "governance",
      name: "制度流程",
      description: "管理制度、流程规范与模板归档。",
      libraries: [
        {
          id: "policy-center",
          name: "制度中心",
          description: "公司制度、管理办法及合规须知的统一入口。",
          tags: ["制度", "管理"],
          recommended: true,
          defaultSelected: true,
          documents: 476,
          updated: "2024-02-15",
          owner: "行政与法务部",
          info: "收录各类制度、员工手册、合规须知等权威文件。",
        },
        {
          id: "process-handbook",
          name: "流程手册库",
          description: "业务流程图、审批路径和 SOP 文档的集中存放。",
          tags: ["流程", "审批"],
          recommended: false,
          defaultSelected: true,
          documents: 389,
          updated: "2024-04-05",
          owner: "流程优化组",
          info: "覆盖 30+ 业务流程的执行指引，并附常见异常处理说明。",
        },
        {
          id: "template-space",
          name: "模板资料库",
          description: "常用文档模板、表单与检查清单下载。",
          tags: ["模板", "下载"],
          recommended: false,
          defaultSelected: true,
          documents: 721,
          updated: "2024-03-22",
          owner: "运营支持部",
          info: "包含项目立项、会议纪要、采购等标准模板，可直接使用。",
        },
        {
          id: "compliance-archive",
          name: "合规与安全库",
          description: "审计记录、安全合规报告与整改追踪。",
          tags: ["合规", "安全"],
          recommended: false,
          defaultSelected: false,
          documents: 205,
          updated: "2024-02-28",
          owner: "安全合规办",
          info: "集中存放合规稽查结果、整改计划与安全事件通报。",
        },
      ],
    },
  ];

  const state = {
    selectedIds: new Set(),
    defaultSelectedIds: new Set(),
  };

  const elements = {};
  const libraryRefs = new Map();
  const groupStates = new Map();
  const numberFormatter = new Intl.NumberFormat("zh-CN");

  function init() {
    cacheElements();
    prepareDefaults();
    renderGroups();
    updateSelectionUI();
    applyFilter();
    bindEvents();
  }

  function cacheElements() {
    elements.libraryGroups = document.getElementById("libraryGroups");
    elements.selectedChips = document.getElementById("selectedChips");
    elements.selectedList = document.getElementById("selectedList");
    elements.selectedCount = document.getElementById("selectedCount");
    elements.filterInput = document.getElementById("libraryFilterInput");
    elements.selectVisible = document.querySelector(".select-visible");
    elements.deselectVisible = document.querySelector(".deselect-visible");
    elements.restoreDefault = document.querySelector(".restore-default");
    elements.clearAll = document.querySelector(".clear-all");
    elements.rememberPreference = document.getElementById("rememberPreference");
    elements.searchButton = document.querySelector(".primary-button");
    elements.toastContainer = document.getElementById("toastContainer");
  }

  function prepareDefaults() {
    LIBRARY_GROUPS.forEach((group) => {
      group.libraries.forEach((lib) => {
        if (lib.defaultSelected) {
          state.defaultSelectedIds.add(lib.id);
          state.selectedIds.add(lib.id);
        }
      });
    });
  }

  function renderGroups() {
    elements.libraryGroups.innerHTML = "";
    libraryRefs.clear();
    groupStates.clear();

    const fragment = document.createDocumentFragment();

    LIBRARY_GROUPS.forEach((group) => {
      const section = document.createElement("section");
      section.className = "library-group";
      section.dataset.groupId = group.id;

      const headerButton = document.createElement("button");
      headerButton.type = "button";
      headerButton.className = "group-header";
      headerButton.setAttribute("aria-expanded", "true");
      headerButton.setAttribute("aria-controls", `group-${group.id}`);

      const headerInfo = document.createElement("div");
      headerInfo.className = "group-info";

      const groupName = document.createElement("span");
      groupName.className = "group-name";
      groupName.textContent = group.name;

      const groupDesc = document.createElement("span");
      groupDesc.className = "group-description";
      groupDesc.textContent = group.description;

      headerInfo.append(groupName, groupDesc);

      const headerMeta = document.createElement("div");
      headerMeta.className = "group-meta";

      const countLabel = document.createElement("span");
      countLabel.dataset.role = "group-count";
      countLabel.textContent = `0/${group.libraries.length}`;

      const toggleIcon = document.createElement("span");
      toggleIcon.className = "group-toggle-icon";
      toggleIcon.setAttribute("aria-hidden", "true");

      headerMeta.append(countLabel, toggleIcon);

      headerButton.append(headerInfo, headerMeta);

      const body = document.createElement("div");
      body.className = "group-body";
      body.id = `group-${group.id}`;

      const groupState = {
        id: group.id,
        data: group,
        section,
        header: headerButton,
        body,
        countLabel,
        emptyHint: null,
      };

      headerButton.addEventListener("click", () => toggleGroup(groupState));

      const librariesFragment = document.createDocumentFragment();

      group.libraries.forEach((lib) => {
        const item = createLibraryItem(groupState, lib);
        librariesFragment.appendChild(item.element);
      });

      body.appendChild(librariesFragment);

      const emptyHint = document.createElement("div");
      emptyHint.className = "group-empty-hint";
      emptyHint.textContent = "没有匹配的文件库";
      emptyHint.hidden = true;
      body.appendChild(emptyHint);
      groupState.emptyHint = emptyHint;

      section.append(headerButton, body);
      fragment.appendChild(section);
      groupStates.set(group.id, groupState);
    });

    elements.libraryGroups.appendChild(fragment);
  }

  function createLibraryItem(groupState, lib) {
    const wrapper = document.createElement("label");
    wrapper.className = "library-item";
    wrapper.dataset.libraryId = lib.id;
    wrapper.dataset.groupId = groupState.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = state.selectedIds.has(lib.id);
    checkbox.dataset.libraryId = lib.id;
    checkbox.setAttribute("aria-label", `选择${lib.name}`);

    const content = document.createElement("div");
    content.className = "library-content";

    const titleRow = document.createElement("div");
    titleRow.className = "library-title-row";

    const nameSpan = document.createElement("span");
    nameSpan.className = "library-name";
    nameSpan.textContent = lib.name;
    titleRow.appendChild(nameSpan);

    if (lib.recommended) {
      const recommendedBadge = document.createElement("span");
      recommendedBadge.className = "badge";
      recommendedBadge.textContent = "推荐";
      titleRow.appendChild(recommendedBadge);
    }

    if (!lib.recommended && lib.defaultSelected) {
      const defaultBadge = document.createElement("span");
      defaultBadge.className = "badge neutral";
      defaultBadge.textContent = "默认";
      titleRow.appendChild(defaultBadge);
    }

    if (lib.fresh) {
      const freshBadge = document.createElement("span");
      freshBadge.className = "badge success";
      freshBadge.textContent = "刚更新";
      titleRow.appendChild(freshBadge);
    }

    const desc = document.createElement("p");
    desc.className = "library-description";
    desc.textContent = lib.description;

    const tags = document.createElement("div");
    tags.className = "library-tags";
    if (Array.isArray(lib.tags)) {
      lib.tags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.textContent = tag;
        tags.appendChild(tagElement);
      });
    }

    const meta = document.createElement("div");
    meta.className = "library-meta";

    const docSpan = document.createElement("span");
    docSpan.textContent = `${numberFormatter.format(lib.documents)} 篇文档`;

    const updateSpan = document.createElement("span");
    updateSpan.textContent = formatUpdateTime(lib.updated);

    meta.append(docSpan, updateSpan);

    content.append(titleRow, desc, tags, meta);

    const actions = document.createElement("div");
    actions.className = "library-item-actions";

    if (lib.owner) {
      const owner = document.createElement("span");
      owner.textContent = `负责人 ${lib.owner}`;
      actions.appendChild(owner);
    }

    const infoButton = document.createElement("button");
    infoButton.type = "button";
    infoButton.className = "info-button";
    infoButton.textContent = "i";
    infoButton.title = lib.info;
    infoButton.setAttribute("aria-label", `${lib.name} 简介`);
    infoButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (lib.info) {
        showToast(lib.info);
      }
    });

    actions.appendChild(infoButton);

    wrapper.append(checkbox, content, actions);

    if (state.selectedIds.has(lib.id)) {
      wrapper.classList.add("library-item--selected");
    }

    libraryRefs.set(lib.id, {
      id: lib.id,
      data: lib,
      groupId: groupState.id,
      checkbox,
      element: wrapper,
      visible: true,
    });

    return { element: wrapper };
  }

  function toggleGroup(groupState) {
    if (!groupState) return;
    const query = (elements.filterInput?.value || "").trim();
    if (query.length > 0) {
      return; // 筛选时保持展开，避免错过结果
    }

    const willCollapse = !groupState.section.classList.contains("is-collapsed");
    groupState.section.classList.toggle("is-collapsed", willCollapse);
    groupState.body.hidden = willCollapse;
    groupState.header.setAttribute("aria-expanded", String(!willCollapse));
  }

  function bindEvents() {
    elements.libraryGroups.addEventListener("change", (event) => {
      const target = event.target;
      if (target && target.matches('input[type="checkbox"][data-library-id]')) {
        const libraryId = target.dataset.libraryId;
        setLibrarySelected(libraryId, target.checked);
      }
    });

    elements.selectedChips.addEventListener("click", (event) => {
      const chip = event.target.closest(".chip");
      if (!chip) return;
      const libraryId = chip.dataset.libraryId;
      setLibrarySelected(libraryId, false);
    });

    elements.selectedList.addEventListener("click", (event) => {
      const button = event.target.closest(".remove-button");
      if (!button) return;
      const libraryId = button.dataset.libraryId;
      setLibrarySelected(libraryId, false);
    });

    elements.filterInput.addEventListener("input", () => {
      applyFilter();
    });

    elements.selectVisible.addEventListener("click", () => {
      const count = bulkToggleVisible(true);
      if (count > 0) {
        updateSelectionUI();
        showToast(`已加入 ${count} 个文件库`, "success");
      } else {
        showToast("当前没有可选的库", "warning");
      }
    });

    elements.deselectVisible.addEventListener("click", () => {
      const count = bulkToggleVisible(false);
      if (count > 0) {
        updateSelectionUI();
        showToast(`已移除 ${count} 个文件库`);
      } else {
        showToast("当前没有匹配的库", "warning");
      }
    });

    elements.restoreDefault.addEventListener("click", () => {
      let changed = 0;
      libraryRefs.forEach((ref) => {
        const shouldSelect = state.defaultSelectedIds.has(ref.id);
        if (setLibrarySelected(ref.id, shouldSelect, { silent: true, skipRefresh: true })) {
          changed += 1;
        }
      });
      updateSelectionUI();
      showToast("已恢复默认推荐库", "success");
    });

    elements.clearAll.addEventListener("click", () => {
      if (state.selectedIds.size === 0) {
        showToast("当前没有选中的库", "warning");
        return;
      }
      libraryRefs.forEach((ref) => {
        setLibrarySelected(ref.id, false, { silent: true, skipRefresh: true });
      });
      updateSelectionUI();
      showToast("已清除全部选择");
    });

    elements.rememberPreference.addEventListener("change", (event) => {
      const checked = event.target.checked;
      showToast(checked ? "将记住当前的勾选偏好" : "本次调整不会被记录", checked ? "success" : "warning");
    });

    elements.searchButton.addEventListener("click", () => {
      const count = state.selectedIds.size;
      if (count === 0) {
        showToast("尚未选择检索范围，可先勾选文件库", "warning");
        return;
      }
      showToast(`将在 ${count} 个库中发起检索`, "success");
    });
  }

  function bulkToggleVisible(shouldSelect) {
    let changed = 0;
    libraryRefs.forEach((ref) => {
      if (ref.visible) {
        if (setLibrarySelected(ref.id, shouldSelect, { silent: true, skipRefresh: true })) {
          changed += 1;
        }
      }
    });
    return changed;
  }

  function applyFilter() {
    const query = (elements.filterInput?.value || "").trim().toLowerCase();
    const hasQuery = query.length > 0;

    groupStates.forEach((groupState) => {
      let visibleCount = 0;

      groupState.data.libraries.forEach((lib) => {
        const ref = libraryRefs.get(lib.id);
        if (!ref) return;

        const matches = !hasQuery || matchesFilter(lib, query);
        ref.visible = matches;
        ref.element.hidden = !matches;
        if (matches) {
          visibleCount += 1;
        }
      });

      if (hasQuery) {
        groupState.section.classList.remove("is-collapsed");
        groupState.body.hidden = false;
        groupState.header.setAttribute("aria-expanded", "true");
      } else if (groupState.section.classList.contains("is-collapsed")) {
        groupState.body.hidden = true;
      } else {
        groupState.body.hidden = false;
      }

      const noVisible = visibleCount === 0;
      groupState.section.classList.toggle("is-filter-empty", noVisible);
      groupState.emptyHint.hidden = !noVisible;
    });
  }

  function matchesFilter(lib, query) {
    const haystack = [lib.name, lib.description, ...(lib.tags || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  }

  function setLibrarySelected(libraryId, shouldSelect, options = {}) {
    const { silent = false, skipRefresh = false } = options;
    if (!libraryRefs.has(libraryId)) return false;

    const ref = libraryRefs.get(libraryId);
    const alreadySelected = state.selectedIds.has(libraryId);

    if (alreadySelected === shouldSelect) {
      return false;
    }

    if (shouldSelect) {
      state.selectedIds.add(libraryId);
    } else {
      state.selectedIds.delete(libraryId);
    }

    ref.checkbox.checked = shouldSelect;
    ref.element.classList.toggle("library-item--selected", shouldSelect);

    if (!skipRefresh) {
      updateSelectionUI();
    }

    if (!silent) {
      const libName = ref?.data?.name || "该库";
      showToast(`${shouldSelect ? "已加入" : "已移除"}「${libName}」`, shouldSelect ? "success" : undefined);
    }

    return true;
  }

  function updateSelectionUI() {
    updateSelectedChips();
    updateSelectedList();
    updateCounts();
  }

  function updateSelectedChips() {
    elements.selectedChips.innerHTML = "";
    const selected = getSelectedLibraries();

    if (selected.length === 0) {
      const placeholder = document.createElement("span");
      placeholder.className = "empty-placeholder";
      placeholder.textContent = "尚未选择文件库";
      elements.selectedChips.appendChild(placeholder);
      return;
    }

    selected.forEach(({ lib }) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.dataset.libraryId = lib.id;
      chip.innerHTML = `
        <span>${lib.name}</span>
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <path d="M9.3 2.7a.75.75 0 0 0-1.06 0L6 4.94 3.76 2.7A.75.75 0 0 0 2.7 3.76L4.94 6 2.7 8.24a.75.75 0 1 0 1.06 1.06L6 7.06 8.24 9.3a.75.75 0 0 0 1.06-1.06L7.06 6 9.3 3.76a.75.75 0 0 0 0-1.06Z" fill="currentColor"></path>
        </svg>
        <span class="sr-only">移除 ${lib.name}</span>
      `;
      elements.selectedChips.appendChild(chip);
    });
  }

  function updateSelectedList() {
    elements.selectedList.innerHTML = "";
    const selected = getSelectedLibraries();

    if (selected.length === 0) {
      const emptyItem = document.createElement("li");
      emptyItem.className = "selected-item empty";
      emptyItem.textContent = "暂未选择任何文件库";
      elements.selectedList.appendChild(emptyItem);
      return;
    }

    selected.forEach(({ group, lib }) => {
      const item = document.createElement("li");
      item.className = "selected-item";

      const info = document.createElement("div");
      info.className = "selected-info";

      const name = document.createElement("div");
      name.className = "selected-name";
      name.textContent = lib.name;

      const desc = document.createElement("div");
      desc.className = "selected-desc";
      desc.textContent = lib.description;

      const meta = document.createElement("div");
      meta.className = "selected-meta";

      const category = document.createElement("span");
      category.textContent = group.name;

      const docCount = document.createElement("span");
      docCount.textContent = `${numberFormatter.format(lib.documents)} 篇文档`;

      const updated = document.createElement("span");
      updated.textContent = formatUpdateTime(lib.updated);

      meta.append(category, docCount, updated);

      info.append(name, desc, meta);

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "remove-button";
      removeButton.dataset.libraryId = lib.id;
      removeButton.textContent = "移除";

      item.append(info, removeButton);
      elements.selectedList.appendChild(item);
    });
  }

  function updateCounts() {
    elements.selectedCount.textContent = state.selectedIds.size;

    groupStates.forEach((groupState) => {
      const total = groupState.data.libraries.length;
      let count = 0;
      groupState.data.libraries.forEach((lib) => {
        if (state.selectedIds.has(lib.id)) {
          count += 1;
        }
      });
      groupState.countLabel.textContent = `${count}/${total}`;
      groupState.section.classList.toggle("has-selected", count > 0);
    });
  }

  function getSelectedLibraries() {
    const results = [];
    LIBRARY_GROUPS.forEach((group) => {
      group.libraries.forEach((lib) => {
        if (state.selectedIds.has(lib.id)) {
          results.push({ group, lib });
        }
      });
    });
    return results;
  }

  function formatUpdateTime(dateString) {
    if (!dateString) return "更新记录缺失";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return `更新 ${dateString}`;
    }
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "今天更新";
    if (diffDays === 1) return "1 天前更新";
    if (diffDays < 7) return `${diffDays} 天前更新`;
    if (diffDays < 30) {
      const weeks = Math.round(diffDays / 7);
      return `${weeks} 周前更新`;
    }
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `更新 ${month}-${day}`;
  }

  function showToast(message, type) {
    if (!elements.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    if (type) {
      toast.classList.add(type);
    }
    toast.textContent = message;
    elements.toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("visible");
    });

    setTimeout(() => {
      toast.classList.remove("visible");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2600);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
