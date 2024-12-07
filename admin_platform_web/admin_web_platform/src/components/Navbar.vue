<template>
  <div class="navbar">
    <div class="right-menu">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ userInfo.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleEditPassword">
            修改密码
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="handleLogout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="400px">
      <el-form
        ref="passwordForm"
        :model="passwordForm"
        :rules="passwordRules"
        label-width="100px"
      >
        <el-form-item label="原密码" prop="oldPassword">
          <el-input
            v-model="passwordForm.oldPassword"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="passwordForm.newPassword"
            type="password"
            show-password
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { editPassword } from '@/api/admin'

export default {
  name: 'Navbar',
  data() {
    return {
      dialogVisible: false,
      passwordForm: {
        empId: '',
        oldPassword: '',
        newPassword: ''
      },
      passwordRules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('admin', ['userInfo'])
  },
  methods: {
    handleEditPassword() {
      this.dialogVisible = true
      this.passwordForm.empId = this.userInfo.id
    },
    handleLogout() {
      this.$store.dispatch('admin/logout').then(() => {
        this.$router.push('/login')
      })
    },
    submitPassword() {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          editPassword(this.passwordForm).then(() => {
            this.$message.success('密码修改成功')
            this.dialogVisible = false
            this.handleLogout()
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;

  .right-menu {
    .el-dropdown-link {
      cursor: pointer;
      color: #333;
    }
  }
}
</style> 