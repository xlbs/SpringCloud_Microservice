package com.xlbs.jobservice.jobsample.billingjob.processor;

import com.xlbs.jobservice.jobsample.billingjob.entity.Message;
import com.xlbs.jobservice.jobsample.billingjob.entity.User;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.util.StringUtils;

public class MessagesItemProcessor implements ItemProcessor<User, Message> {

    public Message process(User user) throws Exception {
        if(!StringUtils.hasText(user.getName())){
            throw new RuntimeException("The user name is required!");
        }
        Message msg = new Message();
        msg.setUser(user);
        msg.setContent("Hello " + user.getName() + ",please pay promptly at end of this month.");
        System.out.println(msg.getContent());
        return msg;
    }

}
