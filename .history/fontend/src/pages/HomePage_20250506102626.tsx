export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-80px)] p-6">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-4">Chào mừng đến với Fakebook!</h1>
      <p className="text-lg text-gray-600 max-w-xl">
        Đây là bản sao đơn giản của Facebook. Bạn có thể đăng ký tài khoản, đăng nhập, và xem các tính năng cơ bản.
      </p>
    </div>
  );
}