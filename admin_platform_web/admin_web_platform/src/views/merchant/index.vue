<template>
  <div class="merchant-container">
    <!-- 搜索区域 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="商家姓名"
        class="filter-item"
        style="width: 200px"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">
        新增商家
      </el-button>
    </div>

    <!-- 表格区域 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="ID" prop="id" align="center" width="80" />
      <el-table-column label="用户名" prop="username" align="center" />
      <el-table-column label="姓名" prop="name" align="center" />
      <el-table-column label="手机号" prop="phone" align="center" />
      <el-table-column label="身份证号" prop="idNumber" align="center" />
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status === 1 ? 'success' : 'info'">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button
            :type="row.status === 1 ? 'warning' : 'success'"
            size="mini"
            @click="handleStatusChange(row)"
          >
            {{ row.status === 1 ? '禁用' : '启用' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      :current-page="listQuery.page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="listQuery.pageSize"
      :total="total"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 新增/编辑对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px">
      <el-form
        ref="dataForm"
        :model="temp"
        :rules="rules"
        label-position="right"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="temp.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="temp.idNumber" placeholder="请输入身份证号" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMerchantList, addMerchant, updateMerchant, updateMerchantStatus } from '@/api/merchant'

export default {
  name: 'Merchant',
  data() {
    return {
      list: [], // 商家列表
      total: 0, // 总记录数
      listLoading: false, // 列表加载状态
      listQuery: {
        page: 1,
        pageSize: 10,
        name: undefined
      },
      dialogVisible: false,
      dialogTitle: '',
      temp: {
        id: undefined,
        username: '',
        name: '',
        phone: '',
        idNumber: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        idNumber: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取商家列表
    getList() {
      this.listLoading = true
      getMerchantList(this.listQuery).then(response => {
        const { records, total } = response.data
        this.list = records
        this.total = total
        this.listLoading = false
      })
    },
    // 搜索
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 新增商家
    handleCreate() {
      this.dialogTitle = '新增商家'
      this.temp = {
        id: undefined,
        username: '',
        name: '',
        phone: '',
        idNumber: ''
      }
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 编辑商家
    handleUpdate(row) {
      this.dialogTitle = '编辑商家'
      this.temp = Object.assign({}, row)
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 提交表单
    submitForm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const isNew = !this.temp.id
          const api = isNew ? addMerchant : updateMerchant
          api(this.temp).then(() => {
            this.$message({
              type: 'success',
              message: isNew ? '创建成功' : '更新成功'
            })
            this.dialogVisible = false
            this.getList()
          })
        }
      })
    },
    // 修改状态
    handleStatusChange(row) {
      const status = row.status === 1 ? 0 : 1
      const statusText = status === 1 ? '启用' : '禁用'
      this.$confirm(`确认要${statusText}该商家吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateMerchantStatus(status, row.id).then(() => {
          this.$message({
            type: 'success',
            message: `${statusText}成功`
          })
          row.status = status
        })
      })
    },
    // 修改每页显示数量
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    // 修改当前页码
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.merchant-container {
  padding: 20px;

  .filter-container {
    margin-bottom: 20px;
    .filter-item {
      margin-right: 10px;
    }
  }

  .el-pagination {
    margin-top: 20px;
  }
}
</style> 