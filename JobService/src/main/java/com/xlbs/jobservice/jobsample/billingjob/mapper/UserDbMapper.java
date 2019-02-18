package com.xlbs.jobservice.jobsample.billingjob.mapper;

import com.xlbs.jobservice.jobsample.billingjob.entity.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDbMapper implements RowMapper {

    @Override
    public Object mapRow(ResultSet resultSet, int i) throws SQLException {
        System.out.println("UserDbMapper："+resultSet.getString("NAME"));
        User user = new User();
        user.setId(resultSet.getLong("ID"));
        user.setName(resultSet.getString("NAME"));
        user.setAge(resultSet.getInt("AGE"));
        user.setBalance(resultSet.getDouble("BALANCE"));
        return user;
    }

}
