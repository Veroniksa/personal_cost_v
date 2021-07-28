import {it, expect} from '@jest/globals';
import { mount} from "@vue/test-utils";
import PaymentsDisplay from '../PaymentsDisplay.vue';

describe("Test Component PaymentsDisplay", ()=>{
  it("Test input category", ()=>{
    const wrapper = mount(PaymentsDisplay);
    console.log(wrapper);
    
    const settings = wrapper.find('settings');
    propsData: {
      settings: {}
    }

/*      const category = wrapper.find('input[name=category]');
     category.setValue(1);  */
  });
});