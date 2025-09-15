"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "test-result",
  setup(__props) {
    const mbtiPersonalityTypes = [
      {
        type: "ISTJ",
        features: "可靠、实际且传统的类型。注重事实和细节，喜欢有序的环境，倾向于遵循既定的规则和程序。",
        careerTendencies: "会计、审计员、银行家、图书管理员、行政人员等。",
        strengths: "组织能力强、责任心强、忠诚可靠。",
        challenges: "可能会过于保守，难以适应变化或新想法。",
        representedRole: "传统守护者"
      },
      {
        type: "ISFJ",
        features: "忠诚、细心且关心他人的类型。重视传统和家庭，关注他人的需要，并希望为他人提供帮助。",
        careerTendencies: "社会工作者、护士、教师、客户服务代表等。",
        strengths: "同理心强、细致周到、责任感强。",
        challenges: "过度承担他人的负担，可能忽视自己的需求。",
        representedRole: "守护者"
      },
      {
        type: "INFJ",
        features: "有洞察力、富有同情心且理想的类型。寻求深层的意义，并且希望能够为世界带来积极的变化。",
        careerTendencies: "心理咨询师、作家、牧师、艺术家等。",
        strengths: "具有远见、富有创造力、情感丰富。",
        challenges: "容易过度理想化，可能会感到孤独或不被理解。",
        representedRole: "倡导者"
      },
      {
        type: "INTJ",
        features: "独立、有远见且善于分析的类型。喜欢解决问题，并且对未来有着清晰的规划。",
        careerTendencies: "科学家、工程师、战略顾问、企业家等。",
        strengths: "战略思维、独立思考、逻辑性强。",
        challenges: "可能会显得冷漠，不擅长表达感情。",
        representedRole: "建筑师"
      },
      {
        type: "ISTP",
        features: "灵活、实用且冷静的类型。喜欢动手解决问题，并且能够在高压环境下保持镇定。",
        careerTendencies: "技术专家、机械师、消防员、警察等。",
        strengths: "解决问题能力强、适应力强、好奇心旺盛。",
        challenges: "难以长时间专注于同一任务，可能缺乏长期规划。",
        representedRole: "工匠"
      },
      {
        type: "ISFP",
        features: "敏感、富有同情心且注重美感的类型。重视个人价值观，并且希望生活充满和谐。",
        careerTendencies: "设计师、摄影师、音乐家、手工艺人等。",
        strengths: "艺术天赋、温和体贴、真诚善良。",
        challenges: "对冲突敏感，有时过于顺从他人意愿。",
        representedRole: "艺术家"
      },
      {
        type: "INFP",
        features: "理想主义、富有同情心且富有想象力的类型。追求个人价值观，并希望生活充满意义。",
        careerTendencies: "作家、非营利组织工作者、心理咨询师等。",
        strengths: "富有创意、深刻的情感、道德感强烈。",
        challenges: "容易自我怀疑，面对现实世界的压力时可能感到无力。",
        representedRole: "治疗者"
      },
      {
        type: "INTP",
        features: "好奇、富有逻辑且喜欢理论的类型。喜欢思考复杂的问题，并寻求改进现有系统的方法。",
        careerTendencies: "程序员、研究员、数学家、哲学家等。",
        strengths: "分析能力强、独立思考、创新意识。",
        challenges: "不擅长社交，可能忽视情感因素。",
        representedRole: "思想家"
      },
      {
        type: "ESTP",
        features: "勇敢、灵活且喜欢冒险的类型。善于即兴发挥，并且能够在紧急情况下迅速做出反应。",
        careerTendencies: "销售员、急救人员、运动员、飞行员等。",
        strengths: "应变能力强、自信乐观、善于交际。",
        challenges: "缺乏耐心，可能难以专注于长期项目。",
        representedRole: "探险者"
      },
      {
        type: "ESFP",
        features: "活泼、外向且善于社交的类型。喜欢成为焦点，并且能够轻松地与人建立联系。",
        careerTendencies: "表演艺术家、导游、健身教练等。",
        strengths: "富有魅力、善于沟通、乐观开朗。",
        challenges: "可能过于冲动，容易忽略细节。",
        representedRole: "娱乐者"
      },
      {
        type: "ENFP",
        features: "热情、富有创意且喜欢自由的类型。富有想象力，并且希望能够影响他人的生活。",
        careerTendencies: "公关专员、记者、社区活动家等。",
        strengths: "富有感染力、富有创造力、情感丰富。",
        challenges: "容易分散注意力，可能过于理想化。",
        representedRole: "冠军"
      },
      {
        type: "ENTP",
        features: "机智、好奇且富有创新精神的类型。喜欢挑战，并且享受辩论的过程。",
        careerTendencies: "律师、发明家、市场分析师等。",
        strengths: "创新能力强、思维敏捷、善于解决问题。",
        challenges: "可能过于好辩，难以接受他人的观点。",
        representedRole: "发明家"
      },
      {
        type: "ESTJ",
        features: "果断、实际且善于组织的类型。喜欢有序的环境，并且善于管理和指导他人。",
        careerTendencies: "经理、项目经理、行政官员等。",
        strengths: "组织能力强、决策果断、责任感强。",
        challenges: "可能过于严格，难以接受混乱或不确定性。",
        representedRole: "主管"
      },
      {
        type: "ESFJ",
        features: "关怀、外向且善于社交的类型。重视和谐，并且总是尽力让他人感到舒适。",
        careerTendencies: "社区服务工作者、客户服务经理、教育工作者等。",
        strengths: "同理心强、善于合作、乐于助人。",
        challenges: "过度照顾他人，可能忽略自己的需求。",
        representedRole: "支持者"
      },
      {
        type: "ENFJ",
        features: "富有同情心、善于领导且富有远见的类型。关心他人的成长，并且能够激励团队。",
        careerTendencies: "领导者、导师、人力资源经理等。",
        strengths: "领导能力强、善于沟通、同理心强。",
        challenges: "容易过度承担他人的负担，可能忽略自己的需求。",
        representedRole: "导师"
      },
      {
        type: "ENTJ",
        features: "果断、富有远见且善于指挥的类型。喜欢领导，并且能够制定有效的策略。",
        careerTendencies: "CEO、战略规划师、军事指挥官等。",
        strengths: "领导能力强、决策果断、富有远见。",
        challenges: "可能过于直接，不善于处理情感问题。",
        representedRole: "指挥官"
      }
    ];
    const hollandTypes = {
      R: {
        name: "现实型",
        description: "喜欢使用工具和机器，从事户外活动，进行体力劳动。喜欢动手操作，解决问题，并且对机械和技术方面感兴趣。",
        careers: ["机械师", "建筑工人", "电工", "技工", "园艺师", "运动员", "消防员", "警察", "汽车修理工"]
      },
      I: {
        name: "研究型",
        description: "对科学和技术感兴趣，喜欢探索事物的本质，解决智力上的难题。倾向于分析问题，喜欢进行实验和研究。",
        careers: ["科学家", "工程师", "医生", "研究员", "实验室技术员", "程序员", "数据分析师", "统计学家", "化学家", "物理学家"]
      },
      A: {
        name: "艺术型",
        description: "富有想象力，追求美的体验，喜欢创造性的表达方式。喜欢设计、表演、写作和其他形式的艺术创作。",
        careers: ["艺术家", "设计师", "摄影师", "演员", "音乐家", "作家", "导演", "平面设计师", "室内设计师", "时装设计师"]
      },
      S: {
        name: "社会型",
        description: "关注他人的福祉，喜欢帮助别人解决问题，促进个人和社会的发展。喜欢与人交流，有较强的责任感和同情心。",
        careers: ["教师", "心理咨询师", "社会工作者", "护士", "顾问", "人力资源经理", "公共关系专家", "宗教领袖"]
      },
      E: {
        name: "企业型",
        description: "喜欢说服和影响他人，追求权力和地位，善于组织和管理。喜欢竞争性的环境，有较强的领导能力和交际能力。",
        careers: ["销售人员", "企业家", "经理", "政治家", "营销专家", "公关专员", "广告策划", "经纪人"]
      },
      C: {
        name: "常规型",
        description: "喜欢结构化的环境，重视秩序和精确性，适合事务性工作。喜欢按照既定的规则和流程办事，擅长处理数据和文件。",
        careers: ["会计师", "银行职员", "秘书", "档案管理员", "行政助理", "数据录入员", "税务员", "办公室经理"]
      }
    };
    const result = common_vendor.ref({});
    const resultType = common_vendor.ref("");
    common_vendor.ref([]);
    const currentContent = common_vendor.ref({});
    function getResult(type) {
      return mbtiPersonalityTypes.find((item) => item.type === type);
    }
    function getGradeList(list) {
      return list.map((d) => {
        return hollandTypes[d.index].name;
      });
    }
    function showContent(title) {
      const d = Object.values(hollandTypes).find((d2) => {
        return d2.name === title;
      });
      currentContent.value = {
        title: d.name,
        desc: d.description,
        career: d.careers.join(",")
      };
    }
    function retest() {
      common_vendor.index.removeStorageSync("test-result");
      common_vendor.index.redirectTo({
        url: "/pages/career-test/career-test"
      });
    }
    common_vendor.onMounted(() => {
      let type = common_vendor.index.getStorageSync("test-result");
      if (type !== "") {
        resultType.value = "career";
        result.value = getResult(type);
      }
      type = common_vendor.index.getStorageSync("holland-result");
      if (type !== "") {
        resultType.value = "holland";
        result.value = getGradeList(type);
        const defaultContent = Object.values(hollandTypes)[0];
        common_vendor.index.__f__("log", "at pages/test-result/test-result.vue:269", defaultContent);
        currentContent.value = {
          title: defaultContent.name,
          desc: defaultContent.description,
          career: defaultContent.careers.join(",")
        };
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: resultType.value === "career"
      }, resultType.value === "career" ? {
        b: common_vendor.t(result.value.type),
        c: common_vendor.t(result.value.features),
        d: common_vendor.t(result.value.careerTendencies),
        e: common_vendor.t(result.value.strengths),
        f: common_vendor.t(result.value.challenges),
        g: common_vendor.t(result.value.representedRole)
      } : {
        h: common_vendor.f(result.value, (d, i, i0) => {
          return common_vendor.e({
            a: common_vendor.t(d),
            b: i < result.value.length - 1
          }, i < result.value.length - 1 ? {} : {});
        }),
        i: common_vendor.f(result.value, (title, k0, i0) => {
          return {
            a: common_vendor.t(title),
            b: common_vendor.o(($event) => showContent(title))
          };
        }),
        j: common_vendor.t(currentContent.value.title),
        k: common_vendor.t(currentContent.value.desc),
        l: common_vendor.t(currentContent.value.career)
      }, {
        m: common_vendor.o(retest)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/test-result/test-result.js.map
