import types from '../types'
import api from '@oj/api'
import storage from '@/utils/storage'
import i18n from '@/i18n'
import { STORAGE_KEY, USER_TYPE, PROBLEM_PERMISSION } from '@/utils/constants'

const state = {
  profile: {
    
  }
}

const getters = {
  user: state => state.profile.user || {},
  profile: state => state.profile,
  isAuthenticated: (state, getters) => {
    return !!getters.user.id
  },
  isAdminRole: (state, getters) => {
    return getters.user.admin_type === USER_TYPE.ADMIN ||
      getters.user.admin_type === USER_TYPE.SUPER_ADMIN
  },
  isSuperAdmin: (state, getters) => {
    return getters.user.admin_type === USER_TYPE.SUPER_ADMIN
  },
  hasProblemPermission: (state, getters) => {
    return getters.user.problem_permission !== PROBLEM_PERMISSION.NONE
  }
}

const mutations = {
  [types.CHANGE_PROFILE] (state, {profile}) {
    state.profile = profile
    if (profile.language) {
      i18n.locale = profile.language
    }
    storage.set(STORAGE_KEY.AUTHED, !!profile.user)
  }
}

const actions = {
  getProfile ({commit}) {
    api.getUserInfo().then(res => {
      commit(types.CHANGE_PROFILE, {
        profile: res.data.data || {}
      })
    })
  },
  clearProfile ({commit}) {
    commit(types.CHANGE_PROFILE, {
      profile: {}
    })
    storage.clear()
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

// import types from '../types'
// import api from '@oj/api'
// import storage from '@/utils/storage'
// import i18n from '@/i18n'
// import { STORAGE_KEY, USER_TYPE, PROBLEM_PERMISSION } from '@/utils/constants'

// const state = {
//   profile: {
//     user: {
//       id: 1,
//       username: 'syl',
//       avatar: 'assets/1.jpg',
//       admin_type: 'ADMIN' // or 'SUPER_ADMIN' for admin role
//     }
//   }
// }

// const getters = {
//   user: state => state.profile.user || {},
//   profile: state => state.profile,
//    //isAuthenticated: () => true, // 模拟已登录状态
// //   // isAuthenticated: (state, getters) => {
// //   //   return !!getters.user.id
// //   // },
//   isAuthenticated: (_state, getters) => {
//     return !!getters.user.id
//   },
//   isAdminRole: (_state, getters) => {
//     return getters.user.admin_type === USER_TYPE.ADMIN ||
//       getters.user.admin_type === USER_TYPE.SUPER_ADMIN
//   },
//   isSuperAdmin: (_state, getters) => {
//     return getters.user.admin_type === USER_TYPE.SUPER_ADMIN
//   },
//   hasProblemPermission: (_state, getters) => {
//     return getters.user.problem_permission !== PROBLEM_PERMISSION.NONE
//   },
//   //userRole: state => state.profile.user || '' // 获取角色信息，默认为空字符串
//   user: state => state.profile.user || {}
// }

// const mutations = {
//   [types.CHANGE_PROFILE] (state, {profile}) {
//     state.profile = profile
//     if (profile.language) {
//       i18n.locale = profile.language
//     }
//     storage.set(STORAGE_KEY.AUTHED, !!profile.user)
//   }
// }

// const actions = {
//   getProfile ({commit}) {
//      api.getUserInfo().then(res => {
//        commit(types.CHANGE_PROFILE, {
//          profile: res.data.data || {}
//        })
//      })
//     const profile = {
//       user: {
//         id: 1,
//         username: 'syl',
//         avatar: 'assets/1.jpg',
//         admin_type: 'ADMIN'
//       }
//     }
//     commit(types.CHANGE_PROFILE, {profile})
//   },
//   clearProfile ({commit}) {
//     commit(types.CHANGE_PROFILE, {
//       profile: {}
//     })
//     storage.clear()
//   }
// }

// export default {
//   state,
//   getters,
//   actions,
//   mutations
// }
