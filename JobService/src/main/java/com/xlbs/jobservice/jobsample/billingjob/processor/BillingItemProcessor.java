package com.xlbs.jobservice.jobsample.billingjob.processor;

import com.xlbs.jobservice.jobsample.billingjob.entity.Bill;
import com.xlbs.jobservice.jobsample.billingjob.entity.User;
import org.springframework.batch.item.ItemProcessor;

public class BillingItemProcessor implements ItemProcessor<User, Bill> {

    public Bill process(User user) throws Exception {
        System.out.println("BillingItemProcessor 用户名："+user.getName());
        Bill bill = new Bill();
        bill.setUser(user);
        bill.setFees(70.00);
        bill.setPaidFees(0.0);
        bill.setUnpaidFees(70.00);
        bill.setPayStatus(0);/*unpaid*/
        return bill;
    }

}
