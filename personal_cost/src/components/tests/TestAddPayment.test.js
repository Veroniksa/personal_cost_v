import {it, expect} from '@jest/globals';
import { mount} from "@vue/test-utils";
import AddPayment from '../AddPayment.vue';

describe("Test Component AddPayment", ()=>{
  it("Test input category", ()=>{
    const wrapper = mount(AddPayment);
     const category = wrapper.find('input[name=category]');
     category.setValue(1); 
  });
});