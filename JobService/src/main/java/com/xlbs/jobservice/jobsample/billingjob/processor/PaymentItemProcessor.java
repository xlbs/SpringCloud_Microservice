package com.xlbs.jobservice.jobsample.billingjob.processor;

import com.xlbs.jobservice.jobsample.billingjob.entity.Bill;
import com.xlbs.jobservice.jobsample.billingjob.entity.PayRecord;
import com.xlbs.jobservice.jobsample.billingjob.exception.MoneyNotEnoughException;
import org.springframework.batch.item.ItemProcessor;

public class PaymentItemProcessor implements ItemProcessor<Bill, PayRecord> {

    public PayRecord process(Bill bill) throws Exception {
        if (bill.getUser().getBalance() <= 0) {
            return null;
        }
        if (bill.getUser().getBalance() >= bill.getUnpaidFees()) {
            // create payrecord
            PayRecord pr = new PayRecord();
            pr.setBill(bill);
            pr.setPaidFees(bill.getUnpaidFees());
            // update balance
            bill.getUser().setBalance(bill.getUser().getBalance() - bill.getUnpaidFees());
            // update bill
            bill.setPaidFees(bill.getUnpaidFees());
            bill.setUnpaidFees(0.0);
            bill.setPayStatus(1);/* paid */
            System.out.println("PaymentItemProcessor "+"用户名："+bill.getUser().getName()+"；账单ID："+bill.getId()+"；余额是否够付款："+(bill.getUser().getBalance() >= bill.getUnpaidFees())+"；已付款金额："+bill.getPaidFees());
            return pr;
        } else {
            System.out.println("PaymentItemProcessor "+"用户名："+bill.getUser().getName()+"；账单ID："+bill.getId()+"；余额是否够付款："+(bill.getUser().getBalance() >= bill.getUnpaidFees())+"；已付款金额："+bill.getPaidFees());
            throw new MoneyNotEnoughException();
        }
    }

}
