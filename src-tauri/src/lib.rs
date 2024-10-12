use tauri::{TitleBarStyle, WebviewUrl, WebviewWindowBuilder};
use uuid::Uuid;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// 更改窗口背景颜色
#[tauri::command]
fn set_background_color(window: tauri::Window, color: [f64; 4]) {
    #[cfg(target_os = "macos")]
    {
        use cocoa::appkit::{NSColor, NSWindow};
        use cocoa::base::{id, nil};
        let ns_window = window.ns_window().unwrap() as id;

        unsafe {
            let bg_color = NSColor::colorWithRed_green_blue_alpha_(
                nil,
                color[0] / 255.0,
                color[1] / 255.0,
                color[2] / 255.0,
                color[3],
            );
            ns_window.setBackgroundColor_(bg_color);
        }
    }
}
// 获取窗口 id
#[tauri::command]
fn get_window_id(window: tauri::Window) -> String {
    window.label().to_string()
}
// 窗口置顶
#[tauri::command]
fn set_pinned(window: tauri::Window, pinned: bool) -> Result<(), String> {
    let _ = window.set_always_on_top(pinned);
    Ok(())
}
#[tauri::command]
fn add_new_window(app: tauri::AppHandle) -> Result<(), String> {
    _add_new_window(app)
}
fn _add_new_window(app: tauri::AppHandle) -> Result<(), String> {
    // 随机位置
    let postion = (rand::random::<f64>() * 500.0, rand::random::<f64>() * 500.0);
    let uuid = Uuid::new_v4().to_string();
    let new_window = WebviewWindowBuilder::new(&app, uuid, WebviewUrl::default())
        .title("")
        .position(postion.0, postion.1)
        .inner_size(400.0, 400.0);
    #[cfg(target_os = "macos")]
    {
        let new_window =  new_window.title_bar_style(TitleBarStyle::Transparent);
        let window = new_window.build().unwrap();
        let default_color =[255.0, 244.0, 163.0, 1.0];
        set_window_background_color(&window, default_color);
    }
    Ok(())
}
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let capp:tauri::AppHandle = app.handle().clone();
            _add_new_window(capp).unwrap();
            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            set_background_color,
            set_pinned,
            add_new_window,
            get_window_id
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn set_window_background_color(window: &tauri::webview::WebviewWindow, color: [f64; 4]) {
    #[cfg(target_os = "macos")]
    {
        use cocoa::appkit::{NSColor, NSWindow};
        use cocoa::base::{id, nil};

        let ns_window = window.ns_window().unwrap() as id;
        unsafe {
            let bg_color = NSColor::colorWithRed_green_blue_alpha_(
                nil,
                color[0] / 255.0,
                color[1] / 255.0,
                color[2] / 255.0,
                color[3],
            );
            ns_window.setBackgroundColor_(bg_color);
        }
    }
}