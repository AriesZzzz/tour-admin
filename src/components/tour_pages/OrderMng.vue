<template>
    <div class="orderMng">
        <el-form :inline="true">
            <el-form-item label="景点信息">
                <el-input v-model="query.tourInfo" placeholder="景点名称或简介"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-date-picker
                    v-model="dateTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getOrderView">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table
            :data="orderList"
            style="width:100%;"
            stripe
            highlight-current-row
        >

            <el-table-column
                label="下单时间">
                <template slot-scope="{row}">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ row.createTime }}</span>
                </template>
            </el-table-column>

            <el-table-column
                label="景点名称">
                <template slot-scope="{row}">
                    <span style="margin-left: 10px">{{ row.scenicSpot.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="票价(￥)">
                <template slot-scope="{row}">
                    <span style="margin-left: 10px">{{ row.money }}</span>
                </template>
            </el-table-column>

            <el-table-column label="票数">
                <template slot-scope="{row}">
                    <span style="margin-left: 10px">{{ row.ticketNum }}</span>
                </template>
            </el-table-column>

            <el-table-column label="状态">
                <template slot-scope="{row}">
                    <el-tag :type="state(row.state)">{{row.state}}</el-tag>
                </template>
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
        <el-dialog title="该时间段内订单信息" :visible.sync="showOrderInfo" width="30%">
            <el-table :data="[orderInfo]">
                <el-table-column property="money" label="总金额"></el-table-column>
                <el-table-column property="orderCount" label="订单数"></el-table-column>
            </el-table>
        </el-dialog>
    </div>

</template>

<script>

    import {
        reqOrderList,
        reqOrderView
    } from 'api'

    export default {
        name: "OrderMng",
        data() {
            return {
                query: {
                    tourInfo: '',
                },
                orderList: [],
                currPage: 1,
                total: 0,
                dateTime: [], // 时间段数组
                orderInfo: null,
                showOrderInfo: false, // 是否展示订单信息
            }
        },
        created() {
            this.getOrderList()
        },
        computed: {
            state() {
                // 判断是否付款
                return (state) => state === '待付款' ? 'danger' : 'success'
            },
        },
        methods: {
            // 统计订单金额数量
            async getOrderView() {
                let result = await reqOrderView(this.dateTime[0], this.dateTime[1])
                if (result.data.code === 0) {
                    this.orderInfo = result.data.data
                    this.showOrderInfo = true
                } else {
                    this.$message.error(result.data.msg)
                }
            },
            search() {
                this.getOrderList()
            },
            changePages(page) {
                this.currPage = page
                this.getOrderList()
            },
            async getOrderList() {
                let result = await reqOrderList(this.query.tourInfo, this.currPage)
                if (result.data.code === 0) {
                    this.orderList = result.data.data
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