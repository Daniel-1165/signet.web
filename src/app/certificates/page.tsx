"use client";

import { useState } from "react";
import { Search, Download, Award } from "lucide-react";
import { client } from "@/lib/sanity/client";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Certificate {
  username: string;
  courseName: string;
  issueDate: string;
  fileUrl: string;
}

export default function CertificatesPage() {
  const [username, setUsername] = useState("");
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchVal = username.trim();
    if (!searchVal) return;

    setLoading(true);
    setError("");
    setCertificate(null);

    try {
      // 1. Try querying Supabase certificates table
      const { data: dbData, error: dbError } = await supabase
        .from("certificates")
        .select("*")
        .or(`username.eq."${searchVal}",email.eq."${searchVal}"`)
        .maybeSingle();

      if (!dbError && dbData) {
        setCertificate({
          username: dbData.username,
          courseName: dbData.course_name,
          issueDate: dbData.issue_date,
          fileUrl: dbData.file_url,
        });
      } else {
        // 2. Fall back to querying Sanity if not found in DB
        const sanityQuery = `*[_type == "certificate" && (username == $searchVal || email == $searchVal)][0]{
          username,
          courseName,
          issueDate,
          "fileUrl": certificateFile.asset->url
        }`;
        const data = await client.fetch(sanityQuery, { searchVal });
        if (data) {
          setCertificate(data);
        } else {
          setError("No certificate found matching that username or email address.");
        }
      }
    } catch (err) {
      console.error("Certificate search error:", err);
      setError("An error occurred while fetching your certificate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative pt-32 pb-24 px-6 flex flex-col items-center">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-signet-primary/5 blur-[120px] pointer-events-none" />
      
      <div className="text-center mb-12 relative z-10 space-y-4">
        <div className="mx-auto w-16 h-16 bg-signet-primary text-white flex items-center justify-center rounded-2xl mb-6 shadow-xl shadow-signet-primary/20">
            <Award size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground">
          Your <span className="text-signet-primary">Certificates</span>.
        </h1>
        <p className="text-foreground/60 max-w-lg mx-auto text-lg leading-relaxed">
          Enter your registered username or email below to view and download your verified program certificates.
        </p>
      </div>

      <div className="w-full max-w-md relative z-10 bg-white p-8 rounded-[2rem] shadow-xl border border-black/5">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-bold text-foreground mb-2">
              Signet Username or Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-foreground/40" />
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. daniel_growth or user@domain.com"
                className="w-full pl-12 pr-4 py-4 bg-background border border-black/10 rounded-xl focus:outline-none focus:border-signet-primary/40 focus:ring-1 focus:ring-signet-primary transition-all text-sm font-medium"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="w-full h-14 bg-signet-primary hover:bg-signet-primary/90 text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(22,56,50,0.3)] transition-all flex items-center justify-center disabled:opacity-50 disabled:scale-100 uppercase tracking-wider text-sm"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Search Certificate"
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 text-sm font-semibold rounded-xl text-center border border-red-100">
            {error}
          </div>
        )}

        {certificate && (
          <div className="mt-8 pt-8 border-t border-black/10 animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-extrabold text-lg text-foreground mb-4">Certificate Found!</h3>
            <div className="p-5 bg-gradient-to-br from-signet-primary/5 to-signet-medium/5 border border-signet-primary/20 rounded-2xl space-y-4">
              <div>
                <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Program</p>
                <p className="font-bold text-foreground text-lg">{certificate.courseName}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Awarded To</p>
                <p className="font-bold text-signet-primary">{certificate.username}</p>
              </div>
              {certificate.issueDate && (
                <div>
                  <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Date</p>
                  <p className="font-semibold text-foreground">
                    {new Date(certificate.issueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              )}
              
              <a
                href={`${certificate.fileUrl}?dl=`}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full h-12 border-2 border-signet-primary text-signet-primary hover:bg-signet-primary hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Download size={18} /> Download Certificate
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
