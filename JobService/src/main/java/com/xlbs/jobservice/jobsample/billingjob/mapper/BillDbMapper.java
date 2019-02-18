package com.xlbs.jobservice.jobsample.billingjob.mapper;

import com.xlbs.jobservice.jobsample.billingjob.entity.Bill;
import com.xlbs.jobservice.jobsample.billingjob.entity.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BillDbMapper implements RowMapper {

    public Object mapRow(ResultSet resultSet, int i) throws SQLException {
        Bill bill = new Bill();
        try {
            System.out.println("用户名："+resultSet.getString("NAME")+"；账单ID："+resultSet.getLong("ID")+"；欠缴费用："+resultSet.getDouble("UNPAID_FEES"));
            bill.setId(resultSet.getLong("ID"));
            User user = new User();
            user.setId(resultSet.getLong("USER_ID"));
            user.setName(resultSet.getString("NAME"));
            user.setBalance(resultSet.getDouble("BALANCE"));
            bill.setUser(user);
            bill.setFees(resultSet.getDouble("FEES"));
            bill.setPaidFees(resultSet.getDouble("PAID_FEES"));
            bill.setUnpaidFees(resultSet.getDouble("UNPAID_FEES"));
            bill.setPayStatus(resultSet.getInt("PAY_STATUS"));
        }catch (Exception e){
            e.printStackTrace();
        }
        return bill;
    }

}
