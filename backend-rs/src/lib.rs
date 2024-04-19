
use near_sdk::{ log, near };

#[near(contract_state)]
#[derive(Default)]
pub struct Contract {
    counter: i32,
}

#[near]
impl Contract {
    #[init]
    pub fn init() -> Self {
        Self {
            counter: 0
        }
    }
    
    pub fn get_num(&self) -> i32 {
        log!("Current value: {}", self.counter);
        self.counter
    }
    
    pub fn increment(&mut self, step: i32) {
        self.counter += step;
        log!("New counter value: {}", self.counter);
    }

    pub fn decrement(&mut self, step: i32) {
        self.counter -= step;
        log!("New counter value: {}", self.counter);
    }

    pub fn reset(&mut self) {
        self.counter = 0;
        log!("New counter value: {}", self.counter);
    }

    
}



// use near_sdk::serde::Deserialize;
// use near_sdk::serde_json;
// use near_sdk::env;
// use near_sdk::json_types::Base64VecU8;

// #[derive(Deserialize)]
// #[serde(crate = "near_sdk::serde")]
// struct Args {
//     pub keys: Vec<Base64VecU8>,
// }


// #[no_mangle]
// pub extern "C" fn clean() {
//     env::setup_panic_hook();
//     let input = env::input().unwrap();
//     let args: Args = serde_json::from_slice(&input).unwrap();
//     for key in args.keys.iter() {
//         env::storage_remove(&key.0);
//     }
// }