const Success= ()=>{
            return (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                  <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">お支払いが完了致しました!!</h2>
                    <p className=" mb-4">動画は日々更新されます！動画をアップして欲しいという声が沢山あるものから順番に収録していきます!</p>
                    <p>そのような声は全てお問い合わせからお願い致します</p>
                    <p>またオフラインコミュニティーの場も設けてますのでSE同士の繋がりもあるので詳しくは<a className="bg-gray-200 text-red-500 p-2 " href="https://mtech-it.com">Mtechホームページ</a></p>
                  </div>
                </div>
              );
}
export default Success;