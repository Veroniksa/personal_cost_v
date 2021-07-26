import {mount} from '@vue/test-utils';
import TestComponent from './TestComponent';

describe('TestComponent', ()=> {
    test("Test Content Component", ()=> {
        const wrapper = mount(TestComponent, {
            propsData: {
                message: "Hello from tests!"
            }
        });
//проверка
        expect(wrapper.text()).toEqual(
            'The message is: Hello from tests!'
            );
    });
    test("Test Content html", ()=> {
        const wrapper = mount(TestComponent, {
            propsData: {
                message: "Hello from tests!"
            }
        });

        expect(wrapper.html()).toEqual(
            'The message is: Hello from tests!'
            );
    });
        test("Test Content toContein", ()=> {
        const wrapper = mount(TestComponent, {
            propsData: {
                message: "Hello from tests!"
            }
        });

        expect(wrapper.text()).toContain(
            'The message is: Hello from tests!'
            );
    });
});