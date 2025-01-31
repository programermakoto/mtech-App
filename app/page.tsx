import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseServer } from "@/utils/supabaseServer";
import { Database } from "@/lib/database.types";

const getAllLessons = async (supabase: SupabaseClient<Database>) => {
  const { data: lessons } = await supabase.from("lesson").select("*");
  return lessons;
};

export default async function Home() {
  const supabase = supabaseServer();
  const lessons = await getAllLessons(supabase);

  return (
    <main className="w-full max-w-7xl mx-auto my-16">
      <div className="w-full flex flex-wrap gap-2">
        {lessons?.map((Lesson) => (
          <Link
            href={`/${Lesson.id}`}
            key={Lesson.id}
            className="w-full sm:w-1/2 md:w-1/3"
            style={{ flex: "1 0 auto" }} // Flex設定でレスポンシブ調整
          >
            <Card className="w-full border border-gray-300 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 bg-white rounded-lg text-center p-6 mb-4 md:mb-0" style={{ minHeight: "30vh" }}>
              <CardHeader>
                <CardTitle>{Lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{Lesson.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
