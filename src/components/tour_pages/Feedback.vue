<template>
    <div class="feedback">
        <el-form :inline="true">
            <el-form-item label="用户名">
                <el-input v-model="query.name" placeholder="用户名关键字"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input v-model="query.content" placeholder="内容关键字"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
            </el-form-item>
        </el-form>


        <el-table
            :data="feedbackList"
            stripe
            style="width: 100%">
            <el-table-column
                prop="content"
                label="反馈内容"
                width="800"
            >
            </el-table-column>
            <el-table-column
                label="用户"
            >
                <template slot-scope="{row}">
                    <el-tag type="success">{{ row.userNumber }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="创建时间">
            </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
            <el-pagination
                style="width: 500px;margin-top: 50px;"
                background
                @current-change="changePages"
                layout="prev, pager, next"
                :page-size="8"
                :total="total * 8">
            </el-pagination>
        </el-row>
    </div>

</template>

<script>
    import {
        reqFeedback
    } from 'api'

    export default {
        name: "feedback",
        data() {
            return {
                query: {
                    name: '',
                    content: ''
                },
                feedbackList: [],
                currPage: 1,
                total: 0,
            }
        },
        created() {
            this.getFeedback()
        },
        computed: {

        },
        methods: {
            search() {
                this.getFeedback()
            },
            changePages(page) {
                this.currPage = page
                this.getFeedback()
            },
            async getFeedback() {
                let result = await reqFeedback(this.query.name, this.query.content, this.currPage)
                if (result.data.code === 0) {
                    this.feedbackList = result.data.data
                    this.total = result.data.page.totalPages
                } else {
                    this.$message.error(result.data.msg)
                }
            }
        },
    }
</script>

<style scoped>

</style>