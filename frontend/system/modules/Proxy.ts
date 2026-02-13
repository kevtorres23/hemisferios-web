import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ["/system/appointments"];
const publicRoutes = ["/system"];

export default function proxy(req: NextRequest) {
    
}