<template>
    <div class="tour">
        <div style="margin: 10px 0;">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 景点管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除
                </el-button>
                <el-button
                    type="primary"
                    icon="el-icon-plus"
                    class="handle-del mr10"
                    @click="handleAdd"
                >新增
                </el-button>
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="景点名称" align="center"></el-table-column>
                <el-table-column label="票价(￥)" align="center">
                    <template slot-scope="scope">{{scope.row.ticketPrice}}</template>
                </el-table-column>
                <el-table-column label="图片预览(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            style="width: 100px;height: 100px;"
                            class="table-td-thumb"
                            :src="scope.row.imgUrls[0]"
                            :preview-src-list="scope.row.imgUrls"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址" align="center"></el-table-column>
                <el-table-column prop="introduction" label="景点简介" align="center"></el-table-column>

                <el-table-column prop="remark" label="备注信息" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑
                        </el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal * 5"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="景点名称">
                    <el-input v-model="form.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="票价(￥)">
                    <el-input v-model="form.ticketPrice" clearable></el-input>
                </el-form-item>
                <el-form-item label="图片预览">
                    <el-upload
                        class="upload-demo"
                        list-type="picture-card"
                        name="multipartFile"
                        action="/travel/json/admin/file/addOne"
                        :file-list="imgList"
                        :on-success="uploadSuccess"
                        :on-remove="removeImg"
                        ref="upload"
                    >
                        <i class="el-icon-upload"></i>
                    </el-upload>
                    <!--<el-input v-model="form.imgUrls" clearable></el-input>-->
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address" clearable></el-input>
                </el-form-item>
                <el-form-item label="景点简介">
                    <el-input
                        type="textarea"
                        :rows="5"
                        v-model="form.introduction"
                        clearable
                        maxlength="100"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="备注信息">
                    <el-input v-model="form.remark" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAction">取 消</el-button>
                <el-button type="primary" @click="saveAction">确 定</el-button>
            </span>
        </el-dialog>

        <!--添加弹出框-->
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="景点名称">
                    <el-input v-model="form.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="票价(￥)">
                    <el-input v-model="form.ticketPrice" clearable></el-input>
                </el-form-item>
                <el-form-item label="图片预览">
                    <el-upload
                        class="upload-demo"
                        list-type="picture-card"
                        name="multipartFile"
                        action="/travel/json/admin/file/addOne"
                        :file-list="imgList"
                        :on-success="uploadSuccess"
                        :on-remove="removeImg"
                        ref="upload"
                    >
                        <i class="el-icon-upload"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address" clearable></el-input>
                </el-form-item>
                <el-form-item label="景点简介">
                    <el-input
                        type="textarea"
                        :rows="5"
                        v-model="form.introduction"
                        clearable
                        maxlength="100"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="备注信息">
                    <el-input v-model="form.remark" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAction">取 消</el-button>
                <el-button type="primary" @click="saveAction">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    import {
        reqTourList,
        addTour,
        updateTour
    } from 'api'

    export default {
        name: "Tour",
        data() {
            return {
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 5
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                addVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1,
                tourParams: {
                    name: '',
                    introduction: '',
                    address: '',
                    ticketPrice: '',
                    remark: '',
                    imgUrls: []
                },
                imgList: []
            }
        },
        created() {
            this.getData();
        },
        computed: {},
        watch: {
            editVisible(newVal) {
                if (!newVal) {
                    this.imgList = []
                }
            }
        },
        methods: {
            handleAdd() {
                this.addVisible = true
            },
            removeImg(file) {
                // 过滤掉删除的图片
                this.imgList =  this.imgList.filter(item => {
                    return item.uid !== file.uid
                })
                this.form.imgUrls = []
                this.imgList.forEach(item => {
                    this.form.imgUrls.push(item.url)
                })
            },
            uploadSuccess(res) {
                this.form.imgUrls.push(res.data)

            },
            async updateTourData(data) {
                let result = await updateTour(data)
                if (result.data.code === 0) {
                    this.$message.success('修改成功')
                    this.query.pageIndex = 1
                    this.getData()
                } else {
                    this.$message.error(result.data.msg)
                }
            },
            async addTourData(data) {
                let result = await addTour(data)
                if (result.data.code === 0) {
                    this.$message.success('添加成功')
                    this.query.pageIndex = 1
                    this.getData()
                } else {
                    this.$message.error(result.data.msg)
                }

            },
            async getData() {
                let result = await reqTourList(this.query.name, this.query.pageIndex)
                if (result.data.code === 0) {
                    this.tableData = result.data.data
                    this.pageTotal = result.data.page.totalPages
                } else {
                    this.$message.error(result.data.msg)
                }
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'pageIndex', 1);
                this.getData();
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {
                    });
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
                // {name: 'food.jpg', url: "http://120.24.186.190:8080/travel/uploadFile/1588400374774201295995.png"}

                // this.imgList = this.form.imgUrls
                // 格式化图片以便文件展示
                this.form.imgUrls.forEach(item => {
                    this.imgList.push({
                        name: 'img',
                        url: item
                    })
                })
            },
            // 保存编辑
            saveAction() {
                this.$refs.upload.clearFiles()
                this.updateTourData(this.form)
                this.editVisible = false;
            },
            cancelAction() {
                this.$refs.upload.clearFiles()
                this.editVisible = false;
            },
            // 分页导航
            handlePageChange(val) {
                this.query.pageIndex = val
                this.getData();
            }
        },
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>