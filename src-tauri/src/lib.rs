use tauri::{TitleBarStyle, WebviewUrl, WebviewWindowBuilder};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
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
// 窗口置顶
#[tauri::command]
fn set_pinned(window: tauri::Window, pinned: bool) -> Result<(), String> {
    let _ = window.set_always_on_top(pinned);
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
                .title("")
                .inner_size(400.0, 400.0);

            #[cfg(target_os = "macos")]
            let win_builder = win_builder.title_bar_style(TitleBarStyle::Transparent);

            let window = win_builder.build().unwrap();
            // window.open_devtools();
            #[cfg(target_os = "macos")]
            {
                let default_color = [255.0, 244.0, 163.0, 1.0];
                set_window_background_color(&window, default_color);
            }

            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            set_background_color,
            set_pinned
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
